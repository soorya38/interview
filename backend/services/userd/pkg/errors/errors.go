package errors

import "errors"

var (
	ErrInvalidUserData = errors.New("invalid user data: username, email, password are required and role_id must be 1 (admin), 2 (user), or 3 (instructor)")
	ErrInvalidUserID   = errors.New("invalid user ID")
	ErrUserNotFound    = errors.New("user not found")
	ErrInvalidUser     = errors.New("invalid user")
)
