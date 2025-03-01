package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strings"
	"userd/entity"
)

var (
	ErrUserNotFound = errors.New("user not found")
	ErrInvalidInput = errors.New("invalid input parameters")
	ErrDuplicateKey = errors.New("user already exists")
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	if db == nil {
		log.Fatal("database connection cannot be nil")
	}
	return &Repository{db: db}
}

func (r *Repository) CreateUser(user *entity.User) error {
	if user == nil {
		return ErrInvalidInput
	}

	// First check if a user with the same username or email already exists
	existingQuery := `
		SELECT user_id FROM users 
		WHERE username = $1 OR email = $2
	`
	var existingID int
	err := r.db.QueryRow(existingQuery, user.Username, user.Email).Scan(&existingID)
	if err == nil {
		// User already exists, return error without modifying the user object
		return ErrDuplicateKey
	} else if err != sql.ErrNoRows {
		// Unexpected error
		log.Printf("Error checking for existing user: %v", err)
		return fmt.Errorf("failed to check for existing user: %w", err)
	}

	// No existing user found, proceed with insertion
	query := `
		INSERT INTO users
			(username, pass, email, role_id, created_at, updated_at, last_login)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING user_id
	`

	var id int
	err = r.db.QueryRow(
		query,
		user.Username,
		user.Password,
		user.Email,
		user.RoleID,
		user.CreatedAt,
		user.UpdatedAt,
		user.LastLogin,
	).Scan(&id)

	if err != nil {
		// Double-check for duplicate key violation (in case of race condition)
		if strings.Contains(err.Error(), "duplicate") {
			return ErrDuplicateKey
		}
		log.Printf("CreateUser error: %v", err)
		return fmt.Errorf("failed to create user: %w", err)
	}

	// Set the ID from the database (user_id column)
	user.ID = id
	return nil
}

func (r *Repository) GetUser(userID int) (*entity.User, error) {
	if userID <= 0 {
		return nil, ErrInvalidInput
	}

	query := `
		SELECT user_id, username, pass, email, role_id, created_at, updated_at, last_login
		FROM users
		WHERE user_id = $1
	`

	user := &entity.User{}
	err := r.db.QueryRow(query, userID).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.RoleID,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.LastLogin,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		log.Printf("GetUser error: %v", err)
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return user, nil
}

func (r *Repository) UpdateUser(user *entity.User) error {
	if user == nil || user.ID <= 0 {
		return ErrInvalidInput
	}

	var result sql.Result
	var err error

	// Only update password if it's provided
	if user.Password != "" {
		query := `
			UPDATE users
			SET username = $1, pass = $2, email = $3, role_id = $4, updated_at = $5, last_login = $6
			WHERE user_id = $7
		`
		result, err = r.db.Exec(
			query,
			user.Username,
			user.Password,
			user.Email,
			user.RoleID,
			user.UpdatedAt,
			user.LastLogin,
			user.ID,
		)
	} else {
		query := `
			UPDATE users
			SET username = $1, email = $2, role_id = $3, updated_at = $4
			WHERE user_id = $5
		`
		result, err = r.db.Exec(
			query,
			user.Username,
			user.Email,
			user.RoleID,
			user.UpdatedAt,
			user.ID,
		)
	}

	if err != nil {
		log.Printf("UpdateUser error: %v", err)
		return fmt.Errorf("failed to update user: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error checking rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}

func (r *Repository) DeleteUser(userID int) error {
	if userID <= 0 {
		return ErrInvalidInput
	}

	query := `
		DELETE FROM users
		WHERE user_id = $1
	`

	result, err := r.db.Exec(query, userID)
	if err != nil {
		log.Printf("DeleteUser error: %v", err)
		return fmt.Errorf("failed to delete user: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Printf("DeleteUser error: %v", err)
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}
