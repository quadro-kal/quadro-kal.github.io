package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// A simple login handler.
func Login(c *gin.Context) {
	var credentials struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real app, verify against a DB. For this demo we use env variables.
	adminUser := os.Getenv("ADMIN_USERNAME")
	adminPass := os.Getenv("ADMIN_PASSWORD")

	if adminUser == "" || adminPass == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Admin credentials are not configured on the server"})
		return
	}

	if credentials.Username == adminUser && credentials.Password == adminPass {
		// Create JWT token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"username": credentials.Username,
			"exp":      time.Now().Add(time.Hour * 72).Unix(),
		})


		jwtKey := os.Getenv("JWT_SECRET")
		if jwtKey == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT_SECRET is not configured on the server"})
			return
		}

		tokenString, err := token.SignedString([]byte(jwtKey))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Login successful",
			"token":   tokenString,
		})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
	}
}
