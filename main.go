package main

import (
	"bootcamp-tracker-go/config"
	"bootcamp-tracker-go/database"
	"bootcamp-tracker-go/routes"

	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	config.LoadEnv()
	database.Connect()

	app := fiber.New()

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":8001"))
}
