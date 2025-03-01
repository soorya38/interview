# Makefile

.PHONY: build run test lint clean setup-dev down help migrate

# Service names
SERVICES := user-service 

# Docker compose commands
DC := docker-compose

# Build all services or a specific service
build:
	@if [ -z "$(SERVICE)" ]; then \
		$(DC) build; \
	else \
		$(DC) build $(SERVICE); \
	fi

# Run all services or a specific service
run:
	@if [ -z "$(SERVICE)" ]; then \
		$(DC) up; \
	else \
		$(DC) up $(SERVICE); \
	fi

# Run all services or a specific service in detached mode
run-detached:
	@if [ -z "$(SERVICE)" ]; then \
		$(DC) up -d; \
	else \
		$(DC) up -d $(SERVICE); \
	fi

# Stop all services or a specific service
stop:
	@if [ -z "$(SERVICE)" ]; then \
		$(DC) stop; \
	else \
		$(DC) stop $(SERVICE); \
	fi

# Tear down the entire environment
down:
	$(DC) down

# Run tests for all services or a specific service
test:
	@if [ -z "$(SERVICE)" ]; then \
		for service in $(SERVICES); do \
			echo "Testing $$service..."; \
			cd services/$$service && go test ./... && cd ../../; \
		done; \
	else \
		cd services/$(SERVICE) && go test ./...; \
	fi

# Run linter for all services or a specific service
lint:
	@if [ -z "$(SERVICE)" ]; then \
		for service in $(SERVICES); do \
			echo "Linting $$service..."; \
			cd services/$$service && golangci-lint run && cd ../../; \
		done; \
	else \
		cd services/$(SERVICE) && golangci-lint run; \
	fi

# Clean build artifacts
clean:
	@for service in $(SERVICES); do \
		echo "Cleaning $$service..."; \
		rm -rf services/$$service/bin; \
	done

# Set up the development environment
setup-dev:
	@echo "Setting up development environment..."
	go mod tidy
	@for service in $(SERVICES); do \
		echo "Setting up $$service..."; \
		cd services/$$service && go mod tidy && cd ../../; \
	done

# Run database migrations for a specific service
migrate:
	@if [ -z "$(SERVICE)" ]; then \
		echo "Please specify a service: make migrate SERVICE=user-service"; \
	else \
		echo "Running migrations for $(SERVICE)..."; \
		cd services/$(SERVICE) && go run cmd/migrate/main.go; \
	fi

# Display help message
help:
	@echo "Microservices Project Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make build [SERVICE=service-name]   - Build all services or a specific service"
	@echo "  make run [SERVICE=service-name]     - Run all services or a specific service"
	@echo "  make run-detached [SERVICE=name]    - Run all services or a specific service in background"
	@echo "  make stop [SERVICE=service-name]    - Stop all services or a specific service"
	@echo "  make down                          - Tear down the entire environment"
	@echo "  make test [SERVICE=service-name]    - Run tests for all services or a specific service"
	@echo "  make lint [SERVICE=service-name]    - Run linter for all services or a specific service"
	@echo "  make clean                         - Clean build artifacts"
	@echo "  make setup-dev                     - Set up the development environment"
	@echo "  make migrate SERVICE=service-name  - Run database migrations for a specific service"
	@echo "  make help                          - Display this help message"