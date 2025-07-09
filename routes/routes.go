package routes

import (
	"bootcamp-tracker-go/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	app.Get("/", controllers.HealthCheck)
	app.Get("/pilots", controllers.GetPilots)
	app.Get("/missionTypes/:pilot", controllers.GetMissionType)
	app.Get("/weapons/:pilot/:missionType", controllers.GetWeapons)
	app.Get("/passes/:pilot/:missionType/:weapon", controllers.GetPasses)

}
