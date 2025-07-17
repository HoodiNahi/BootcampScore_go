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
	app.Static("/", "./frontend")

	app.Get("*", func(c *fiber.Ctx) error {
		return c.SendFile("./frontend/index.html")
	})

	log.Fatal(app.Listen(":8001"))
}

//move the chart up
//dont display more than 150m
//auto select first weapon
//move selectPilot and selectMission on same line (checkout bootstrap)
