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

func (s *Service) GetUser(userID int) (*entity.User, error) {
	user, err := s.repo.GetUser(userID)
	if err != nil {
		return nil, err
	}
	return user, nil
}
