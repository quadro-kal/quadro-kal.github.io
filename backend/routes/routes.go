package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/user/portfolio-backend/controllers"
	"github.com/user/portfolio-backend/middlewares"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		// Public Auth
		api.POST("/login", controllers.Login)

		// Public GETs
		api.GET("/projects", controllers.GetProjects)
		api.GET("/articles", controllers.GetArticles)

		// Public POSTs (Visitors can submit contact forms)
		api.POST("/contacts", controllers.CreateContact)
	}

	protected := r.Group("/api")
	protected.Use(middlewares.AuthMiddleware())
	{
		// Protected Endpoints for Admin
		protected.POST("/projects", controllers.CreateProject)
		protected.POST("/articles", controllers.CreateArticle)
		protected.GET("/contacts", controllers.GetContacts)
	}
}
