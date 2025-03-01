package handler

import (
	"errors"
	"strconv"
	"strings"
	"userd/entity"
	e "userd/pkg/errors"
	"userd/repository"
	"userd/usecase"

	"github.com/gofiber/fiber/v2"
)

func validateEmail(email string) bool {
	return len(email) > 5 &&
		strings.Contains(email, "@") &&
		strings.Contains(email, ".") &&
		!strings.HasPrefix(email, "@") &&
		!strings.HasSuffix(email, ".")
}

func createUser(c *fiber.Ctx, service *usecase.Service) error {
	//read from request body
	user := &entity.User{}
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request format"})
	}

	// Basic validation
	if user.Username == "" || user.Password == "" || !validateEmail(user.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required fields or invalid email"})
	}

	if err := service.CreateUser(user); err != nil {
		if errors.Is(err, e.ErrInvalidUserData) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		if errors.Is(err, repository.ErrDuplicateKey) {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "User already exists"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// Return the created user ID only if creation was successful
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User created successfully",
		"user_id": user.ID,
	})
}

func getUser(c *fiber.Ctx, service *usecase.Service) error {
	userID := c.Params("id")
	userId, err := strconv.Atoi(userID)
	if err != nil || userId <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": e.ErrInvalidUserID.Error()})
	}

	user, err := service.GetUser(userId)
	if err != nil {
		if errors.Is(err, e.ErrUserNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		if errors.Is(err, e.ErrInvalidUserData) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// Don't return password
	user.Password = ""
	return c.JSON(user)
}

func updateUser(c *fiber.Ctx, service *usecase.Service) error {
	userID := c.Params("id")
	userId, err := strconv.Atoi(userID)
	if err != nil || userId <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": e.ErrInvalidUserID.Error()})
	}

	//read from request body
	user := &entity.User{}
	if err = c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request format"})
	}

	// Basic validation
	if user.Username == "" || !validateEmail(user.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required fields or invalid email"})
	}

	// Set the ID from the path parameter
	user.ID = userId

	if err = service.UpdateUser(user); err != nil {
		if errors.Is(err, e.ErrUserNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		if errors.Is(err, e.ErrInvalidUser) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "User updated successfully"})
}

func deleteUser(c *fiber.Ctx, service *usecase.Service) error {	
	userID := c.Params("id")
	userId, err := strconv.Atoi(userID)
	if err != nil || userId <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": e.ErrInvalidUserID.Error()})
	}

	if err = service.DeleteUser(userId); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "User deleted successfully"})
}


func RegisterHandlers(app *fiber.App, service *usecase.Service) {
	app.Post("/user", func(c *fiber.Ctx) error {
		return createUser(c, service)
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		return getUser(c, service)
	})

	app.Put("/user/:id", func(c *fiber.Ctx) error {
		return updateUser(c, service)
	})

	app.Delete("/user/:id", func(c *fiber.Ctx) error {
		return deleteUser(c, service)
	})
}
