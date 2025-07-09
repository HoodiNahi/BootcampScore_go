package models

import "time"

type Bootcamp struct {
	RangeID     uint       `gorm:"column:range_id" json:"range_id"`
	PlayerName  string     `gorm:"column:player_name" json:"player_name"`
	PassAttempt int        `gorm:"column:pass_attempt" json:"pass_attempt"`
	TargetName  string     `gorm:"column:target_name" json:"target_name"`
	Distance    float64    `gorm:"column:distance" json:"distance"`
	Radial      string     `gorm:"column:radial" json:"radial"`
	Quality     string     `gorm:"column:quality" json:"quality"`
	Weapon      string     `gorm:"column:weapon" json:"weapon"`
	Airframe    string     `gorm:"column:airframe" json:"airframe"`
	MissionTime string     `gorm:"column:mission_time" json:"mission_time"`
	MissionType string     `gorm:"column:mission_type" json:"mission_type"`
	MissionDate string     `gorm:"column:mission_date" json:"mission_date"`
	CreatedAt   *time.Time `gorm:"column:created_at" json:"created_at"`
}
