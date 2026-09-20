package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/user/portfolio-backend/config"
	"github.com/user/portfolio-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetProjects(c *gin.Context) {
	projects := []models.Project{}
	collection := config.GetCollection("projects")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while fetching projects"})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var project models.Project
		cursor.Decode(&project)
		projects = append(projects, project)
	}

	c.JSON(http.StatusOK, projects)
}

func CreateProject(c *gin.Context) {
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := config.GetCollection("projects")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	project.ID = primitive.NewObjectID()
	result, err := collection.InsertOne(ctx, project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Project created successfully", "id": result.InsertedID})
}
