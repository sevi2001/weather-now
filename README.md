# 🌤️ WeatherNow — Weather Forecast Dashboard

**WeatherNow** is a modern, responsive weather forecasting web application developed using **Angular, TypeScript, and SCSS**. It provides real-time weather information, hourly forecasts, and 5-day weather predictions through the OpenWeather API.

The application features a dark navy and blue dashboard, interactive weather information, favorite locations, and personalized search history.

### 🔗 Live Demo & Repository

🌐 **Live Website:** [WeatherNow](https://weather-now-nine-azure.vercel.app/)

💻 **GitHub Repository:** [sevi2001/weather-now](https://github.com/sevi2001/weather-now)

---

## ✨ Features

- 🌍 **City Search** — Search for weather information in cities around the world.
- 🌡️ **Current Weather** — View temperature, weather conditions, humidity, wind speed, and cloud cover.
- 🕒 **Hourly Forecast** — Explore upcoming weather conditions throughout the day.
- 📅 **5-Day Forecast** — View daily temperature ranges and weather predictions.
- 🔄 **Temperature Conversion** — Switch between Celsius (°C) and Fahrenheit (°F).
- ⭐ **Favorite Locations** — Save frequently visited cities for quick access.
- 🕘 **Recent Search History** — Automatically stores the five most recent city searches.
- 🌅 **Weather Highlights** — View additional information, including sunrise and sunset.
- 📱 **Responsive Design** — Supports desktop, tablet, and mobile screens.
- 💾 **Local Storage** — Saves favorite cities and search history between sessions.
- 🔐 **Secure API Integration** — Uses Vercel serverless functions to keep the OpenWeather API key out of the frontend.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic |
| HTML5 | Application structure |
| SCSS | Styling and responsive layouts |
| OpenWeather API | Weather information and forecasts |
| RxJS | Asynchronous API requests |
| Local Storage | Favorite cities and search history |
| Vercel | Hosting and serverless API |
| Git & GitHub | Version control and source code hosting |

---

## 📸 Screenshots

### Weather Dashboard

_Add a screenshot of the main WeatherNow dashboard here._

### Forecast and Weather Highlights

_Add screenshots of the hourly forecast, 5-day forecast, and weather highlights here._

### Mobile Responsive Design

_Add a screenshot showing the application on a mobile device._

---

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Angular CLI
- Vercel CLI
- An OpenWeather API key

### 1. Clone the Repository

```bash
git clone https://github.com/sevi2001/weather-now.git
```

### 2. Navigate to the Project

```bash
cd weather-now
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

Replace the placeholder with your own API key from [OpenWeather](https://openweathermap.org/api).

**Security:** Never commit `.env.local` or your actual API key to GitHub.

### 5. Run the Application Locally

Since WeatherNow uses Vercel serverless functions, start the application using:

```bash
npx vercel dev
```

Open the localhost address displayed in your terminal.

### 6. Build for Production

```bash
npm run build
```

---

## 🔗 API Integration

WeatherNow uses the OpenWeather API to retrieve current weather conditions and forecasts.

The Angular frontend communicates with a Vercel serverless function through:

```text
/api/weather?city=Colombo&type=current
/api/weather?city=Colombo&type=forecast
```

The serverless function retrieves the weather information from OpenWeather and returns the response to the Angular application.

This architecture keeps the API key on the server rather than embedding it in the frontend.

---

## 🎯 Project Objectives

This project was developed to gain practical experience in:

- Building applications using Angular and TypeScript.
- Integrating third-party REST APIs.
- Implementing asynchronous HTTP requests with RxJS.
- Creating responsive and interactive user interfaces.
- Managing client-side data using Local Storage.
- Working with environment variables and serverless functions.
- Deploying applications using GitHub and Vercel.

---

## 🚀 Deployment

WeatherNow is deployed using **Vercel**, with the source code maintained on GitHub.

🌐 **Live Application:** https://weather-now-nine-azure.vercel.app/

💻 **Source Code:** https://github.com/sevi2001/weather-now

---

## 👩‍💻 Developer

**GitHub:** [@sevi2001](https://github.com/sevi2001)

Developed as a personal project to strengthen frontend development skills and gain hands-on experience with Angular, REST APIs, and cloud deployment.

---

⭐ If you find this project useful, consider starring the repository!
