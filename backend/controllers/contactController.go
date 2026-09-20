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

func GetContacts(c *gin.Context) {
	contacts := []models.Contact{}
	collection := config.GetCollection("contacts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while fetching contacts"})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var contact models.Contact
		cursor.Decode(&contact)
		contacts = append(contacts, contact)
	}

	c.JSON(http.StatusOK, contacts)
}

func CreateContact(c *gin.Context) {
	var contact models.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	contact.CreatedAt = time.Now().Format(time.RFC3339)

	collection := config.GetCollection("contacts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	contact.ID = primitive.NewObjectID()
	result, err := collection.InsertOne(ctx, contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit contact form"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Message sent successfully", "id": result.InsertedID})
}
