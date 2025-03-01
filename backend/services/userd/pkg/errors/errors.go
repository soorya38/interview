package errors

import "errors"

var (
	ErrInvalidUserData = errors.New("invalid user data")
	ErrInvalidUserID   = errors.New("invalid user ID")
)
