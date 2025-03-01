package utils

import "os"

// GetEnv retrieves the value of the environment variable named by the key.
// If the variable is not present, the defaultValue is returned.
func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
