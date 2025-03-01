package main

import (
	"database/sql"
	"fmt"
	"log"
	"userd/handler"
	"userd/repository"
	"userd/usecase"
	"userd/utils"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq" // PostgreSQL driver
)

func main() {
	// Load database configurations
	dbUser := utils.GetEnv("DB_USER", "postgres")
	dbPassword := utils.GetEnv("DB_PASSWORD", "password")
	dbHost := utils.GetEnv("DB_HOST", "user-db") // Changed from localhost to user-db to match container name
	dbPort := utils.GetEnv("DB_PORT", "5432")
	dbName := utils.GetEnv("DB_NAME", "user_db")
	dbSSLMode := utils.GetEnv("DB_SSLMODE", "disable")

	// Create PostgreSQL connection string
	dataSourceName := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=%s",
		dbUser, dbPassword, dbHost, dbPort, dbName, dbSSLMode,
	)

	// Connect to the database
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		log.Fatalf("Unable to initialize database: %v", err)
	}
	defer db.Close()

	// Verify connection
	if err = db.Ping(); err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	log.Println("Connected to PostgreSQL database!")

	repo := repository.NewRepository(db)
	service := usecase.NewService(repo)

	// Initialize Fiber app
	app := fiber.New()
	handler.RegisterHandlers(app, service)

	// Start server
	port := utils.GetEnv("PORT", "8080")
	log.Printf("User service starting on port %s...", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
