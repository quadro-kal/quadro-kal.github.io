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

func GetArticles(c *gin.Context) {
	articles := []models.Article{}
	collection := config.GetCollection("articles")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while fetching articles"})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var article models.Article
		cursor.Decode(&article)
		articles = append(articles, article)
	}

	c.JSON(http.StatusOK, articles)
}

func CreateArticle(c *gin.Context) {
	var article models.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	article.CreatedAt = time.Now().Format(time.RFC3339)

	collection := config.GetCollection("articles")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	article.ID = primitive.NewObjectID()
	result, err := collection.InsertOne(ctx, article)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create article"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Article created successfully", "id": result.InsertedID})
}
