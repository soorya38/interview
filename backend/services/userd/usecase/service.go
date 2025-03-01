package usecase

import (
	"errors"
	"time"
	"userd/entity"
	"userd/repository"
)

var (
	ErrInvalidUser  = errors.New("invalid user data")
	ErrUserNotFound = errors.New("user not found")
)

// Service handles business logic for users
type Service struct {
	repo *repository.Repository
}

// NewService creates a new service instance
func NewService(repo *repository.Repository) *Service {
	return &Service{
		repo: repo,
	}
}

// CreateUser creates a new user
func (s *Service) CreateUser(user *entity.User) error {
	// Validate user
	if user.Username == "" || user.Email == "" || user.Password == "" {
		return ErrInvalidUser
	}

	// Set timestamps
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	user.LastLogin = time.Now()

	// Hash password in a real application
	// user.Password = hashPassword(user.Password)

	// The repository will set the ID in the user object if successful
	err := s.repo.CreateUser(user)
	if err != nil {
		// Pass through the error without modifying the user object
		return err
	}

	return nil
}

// GetUser retrieves a user by ID
func (s *Service) GetUser(userID int) (*entity.User, error) {
	if userID <= 0 {
		return nil, ErrInvalidUser
	}

	user, err := s.repo.GetUser(userID)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return user, nil
}

// UpdateUser updates an existing user
func (s *Service) UpdateUser(user *entity.User) error {
	// Validate user
	if user.ID <= 0 || user.Username == "" || user.Email == "" {
		return ErrInvalidUser
	}

	// Check if user exists
	_, err := s.repo.GetUser(user.ID)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return ErrUserNotFound
		}
		return err
	}

	// Update timestamp
	user.UpdatedAt = time.Now()

	// If password is provided, hash it in a real application
	// if user.Password != "" {
	//     user.Password = hashPassword(user.Password)
	// }

	return s.repo.UpdateUser(user)
}
