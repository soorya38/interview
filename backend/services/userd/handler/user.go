package handler

import (
	"time"
	"userd/entity"
	"userd/usecase"

	"github.com/gofiber/fiber/v2"
)

func check(c *fiber.Ctx, service *usecase.Service) error {
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

func RegisterHandlers(app *fiber.App, service *usecase.Service) {
	app.Get("/", func(c *fiber.Ctx) error {
		return check(c, service)
	})
}
