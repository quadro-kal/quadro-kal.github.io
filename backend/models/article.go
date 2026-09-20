package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Article struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title" binding:"required"`
	Content   string             `json:"content" bson:"content" binding:"required"`
	CreatedAt string             `json:"createdAt" bson:"createdAt"`
}
