package controllers

import (
	"bootcamp-tracker-go/database"
	"bootcamp-tracker-go/models"

	"github.com/gofiber/fiber/v2"
)

func HealthCheck(c *fiber.Ctx) error {
	return c.SendString("Bootcamp Go API is alive 🚀")
}

func GetPilots(c *fiber.Ctx) error {
	var pilots []string
	database.DB.Raw("SELECT DISTINCT player_name FROM common.range_eval").Scan(&pilots)
	return c.JSON(pilots)
}

func GetMissionType(c *fiber.Ctx) error {
	pilot := c.Params("pilot")
	var missionType []string
	database.DB.Raw(`
		SELECT DISTINCT mission_type 
		from common.range_eval
		WHERE player_name = ?`, pilot).Scan(&missionType)
	return c.JSON(missionType)
}

func GetWeapons(c *fiber.Ctx) error {
	pilot := c.Params("pilot")
	mission := c.Params("missionType")
	var weapons []string
	database.DB.Raw(`
        SELECT DISTINCT weapon 
        FROM common.range_eval 
        WHERE player_name = ? AND mission_type = ?`, pilot, mission).Scan(&weapons)
	return c.JSON(weapons)
}

func GetPasses(c *fiber.Ctx) error {
	pilot := c.Params("pilot")
	missionType := c.Params("missionType")
	weapon := c.Params("weapon")
	var passes []models.Bootcamp
	database.DB.Raw(`
		SELECT *
		FROM common.range_eval
		WHERE player_name = ? AND mission_type = ? AND weapon = ?`, pilot, missionType, weapon).Scan(&passes)
	return c.JSON(passes)
}
