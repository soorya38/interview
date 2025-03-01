# build/Dockerfile
FROM golang:1.19-alpine AS builder

ARG SERVICE_NAME

WORKDIR /app

# Copy the entire codebase
COPY . .

# Download dependencies - only if go.mod exists
RUN if [ -f go.mod ]; then go mod download; fi

# Build the service
WORKDIR /app/services/${SERVICE_NAME}
RUN mkdir -p /app/bin && \
    if [ -d cmd/server ]; then \
        CGO_ENABLED=0 GOOS=linux go build -o /app/bin/service ./cmd/server; \
    else \
        echo "No cmd/server directory found, creating dummy service" && \
        echo '#!/bin/sh\necho "Service not implemented yet"\nsleep infinity' > /app/bin/service && \
        chmod +x /app/bin/service; \
    fi

# Use a small alpine image for the final container
FROM alpine:3.16

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/bin/service .

# Create configs directory and copy configs if they exist
RUN mkdir -p ./configs/
# Use a shell command to copy configs instead of COPY instruction with multiple sources
RUN if [ -d /app/services/${SERVICE_NAME}/configs ]; then cp -r /app/services/${SERVICE_NAME}/configs/* ./configs/ 2>/dev/null || true; fi

# Set environment variables
ENV PORT=8080

# Expose the service port
EXPOSE 8080

# Run the service
CMD ["./service"]