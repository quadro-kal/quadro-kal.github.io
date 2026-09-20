package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017" // Default for local dev
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB: ", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("MongoDB ping failed: ", err)
	}

	fmt.Println("Successfully connected to MongoDB!")
	DB = client
}

func GetCollection(collectionName string) *mongo.Collection {
	return DB.Database("portfolio").Collection(collectionName)
}
