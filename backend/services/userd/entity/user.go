package entity

import (
	"errors"
	"time"
)

type Role struct {
	RoleID int
	Name   string
}

type User struct {
	UserID    int
	Username  string
	Password  string
	Email     string
	RoleID    int
	CreatedAt time.Time
	UpdatedAt time.Time
	LastLogin time.Time
}

func NewUser(userID int, username string, password string, email string, roleID int) (*User, error) {
	u := &User{
		UserID:    userID,
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
