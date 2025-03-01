package handler

import (
	"strconv"
	"time"
	"userd/entity"
	"userd/usecase"

	"github.com/gofiber/fiber/v2"
)

func createUser(c *fiber.Ctx, service *usecase.Service) error {
	service.CreateUser(&entity.User{
		UserID:    1,
		Username:  "test",
		Password:  "test",
		Email:     "test@test.com",
		RoleID:    1,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		LastLogin: time.Now(),
	})
	return c.SendString("OK")
}

func getUser(c *fiber.Ctx, service *usecase.Service) error {
	userID := c.Params("id")
	userId, err := strconv.Atoi(userID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid user ID")
	}

	user, err := service.GetUser(userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(user)
}

func RegisterHandlers(app *fiber.App, service *usecase.Service) {
	app.Post("/user", func(c *fiber.Ctx) error {
		return createUser(c, service)
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		return getUser(c, service)
	})
}
