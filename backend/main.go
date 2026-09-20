package main

import (
	"github.com/gin-gonic/gin"
	"github.com/user/portfolio-backend/config"
	"github.com/user/portfolio-backend/routes"
	"log"
)

func main() {
	// Initialize Database Connection
	config.ConnectDB()

	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Setup API routes
	routes.SetupRoutes(r)

	log.Println("Server is running on port 8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
