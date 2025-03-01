package usecase

import "userd/entity"

type Repository interface {
	Writer
	Reader
}

type Writer interface {
	CreateUser(user *entity.User) error
	UpdateUser(user *entity.User) error
}

type Reader interface {
	GetUser(userID int) (*entity.User, error)
}

type Usecase interface {
	CreateUser(user *entity.User) error
	GetUser(userID int) (*entity.User, error)
}
