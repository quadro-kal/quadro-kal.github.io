package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Contact struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name" binding:"required"`
	Email     string             `json:"email" bson:"email" binding:"required"`
	Message   string             `json:"message" bson:"message" binding:"required"`
	CreatedAt string             `json:"createdAt" bson:"createdAt"`
}
