# 🛩️ BootcampScore Go API

This is the GoLang backend for the Bootcamp Score Tracker — a REST API that connects to a PostgreSQL database and serves telemetry data such as pilot performance, weapon usage, and mission stats.

Built with:
- [Fiber](https://github.com/gofiber/fiber) — Fast HTTP router
- [GORM](https://gorm.io/) — ORM for Go
- [PostgreSQL](https://www.postgresql.org/) — Database
- [godotenv](https://github.com/joho/godotenv) — Load `.env` files

---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/<your-username>/BootcampScore_go.git
cd BootcampScore_go
```
### 2. Setup .env
Create a .env file in the root directory:
```
DB_USER=User
DB_PASSWORD=your_password
DB_HOST=IP
DB_PORT=5432
DB_NAME=bootcampDB

```
### 3. Install Dependencies
```
go mod tidy
```
### 4. Run the Server
```
go run main.go
```
### 📦 API Endpoints
| Method | Endpoint                              | Description                        |
| ------ | ------------------------------------- | ---------------------------------- |
| GET    | `/`                                   | Health check                       |
| GET    | `/pilots`                             | List of unique pilot names         |
| GET    | `/missionTypes/:pilot`                | Mission types for a given pilot    |
| GET    | `/weapons/:pilot/:missionType`        | Weapons used by pilot in a mission |
| GET    | `/passes/:pilot/:missionType/:weapon` | Passes data for a given weapon     |
