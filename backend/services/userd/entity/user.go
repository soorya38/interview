package entity

import (
	"errors"
	"time"
)

type Role struct {
	RoleID int
	Name   string
}

// User represents a user in the system
type User struct {
	ID        int       `json:"id" db:"user_id"`
	Username  string    `json:"username" db:"username"`
	Email     string    `json:"email" db:"email"`
	Password  string    `json:"password,omitempty" db:"pass"`
	RoleID    int       `json:"role_id" db:"role_id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	LastLogin time.Time `json:"last_login" db:"last_login"`
}

func NewUser(userID int, username string, password string, email string, roleID int) (*User, error) {
	u := &User{
		ID:        userID,
		Username:  username,
		Password:  password,
		Email:     email,
		RoleID:    roleID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		LastLogin: time.Now(),
	}
	if err := u.validate(); err != nil {
		return nil, err
	}
	return u, nil
}

func (u *User) validate() error {
	if u.Username == "" || u.Password == "" || u.Email == "" {
		return errors.New("invalid user")
	}
	return nil
}
