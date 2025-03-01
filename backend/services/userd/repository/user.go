package repository

import (
	"database/sql"
	"log"
	"userd/entity"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreateUser(user *entity.User) error {
	query := `
		INSERT INTO users
			(user_id, username, pass, email, role_id, created_at, updated_at, last_login)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`
	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Printf("err=%v", err)
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(
		user.UserID,
		user.Username,
		user.Password,
		user.Email,
		user.RoleID,
		user.CreatedAt,
		user.UpdatedAt,
		user.LastLogin,
	)
	if err != nil {
		log.Printf("err=%v", err)
		return err
	}

	return err
}
