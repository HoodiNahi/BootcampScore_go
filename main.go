package main

import (
	"bootcamp-tracker-go/config"
	"bootcamp-tracker-go/database"
	"bootcamp-tracker-go/routes"
	"os"

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
		return c.SendFile("./frontend/build/index.html")
	})

	log.Fatal(app.Listen(os.Getenv("APP_LISTEN")))
}

//move the chart up - DONE
//dont display more than 150m - DONE
//auto select first weapon - DONE
//move selectPilot and selectMission on same line (checkout bootstrap) - DONE
