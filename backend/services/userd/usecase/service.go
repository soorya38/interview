package usecase

import (
	"userd/entity"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateUser(user *entity.User) error {
	if err := s.repo.CreateUser(user); err != nil {
		return err
	}
	return nil
}
