package usecase

import "userd/entity"

type Repository interface {
	Writer
}

type Writer interface {
	CreateUser(user *entity.User) error
}

type Usecase interface {
	CreateUser(user *entity.User) error
}
