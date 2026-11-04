import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';

import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  recentCities: string[] = [];
  loadRecentCities(): void {
  const savedCities = localStorage.getItem('recentCities');

  if (savedCities) {
    this.recentCities = JSON.parse(savedCities);
  }
}

addRecentCity(city: string): void {
  this.recentCities = [
    city,
    ...this.recentCities.filter(
      recentCity => recentCity.toLowerCase() !== city.toLowerCase()
    )
  ].slice(0, 5);

  localStorage.setItem(
    'recentCities',
    JSON.stringify(this.recentCities)
  );
}

selectRecentCity(city: string): void {
  this.loadWeather(city);
}

  favoriteCities: string[] = [];
  // Load favorite cities from Local Storage
loadFavorites(): void {
  const savedFavorites = localStorage.getItem('weatherFavorites');

  if (savedFavorites) {
    this.favoriteCities = JSON.parse(savedFavorites);
  }
}

// Add or remove a favorite city
toggleFavorite(): void {
  if (!this.weatherData) {
    return;
  }

  const city = this.weatherData.name;

  if (this.favoriteCities.includes(city)) {
    this.favoriteCities = this.favoriteCities.filter(
      favorite => favorite !== city
    );
  } else {
    this.favoriteCities.push(city);
  }

  localStorage.setItem(
    'weatherFavorites',
    JSON.stringify(this.favoriteCities)
  );
}

// Check if current city is a favorite
isFavorite(): boolean {
  return this.weatherData
    ? this.favoriteCities.includes(this.weatherData.name)
    : false;
}

// Load weather for a favorite city
selectFavorite(city: string): void {
  this.loadWeather(city);
}

  // Temperature unit
unit: 'C' | 'F' = 'C';

// Toggle temperature unit
toggleTemperature(): void {
  this.unit = this.unit === 'C' ? 'F' : 'C';
}

// Convert Celsius to Fahrenheit
convertTemperature(temp: number): number {
  if (this.unit === 'C') {
    return temp;
  }

  return (temp * 9 / 5) + 32;
}

  private cdr = inject(ChangeDetectorRef);


  // Dashboard title and current date
  title = 'WeatherNow';
  today = new Date();

  // Weather service
  private weatherService = inject(WeatherService);

  // Weather information
  weatherData: any = null;
  forecastData: any[] = [];
  dailyForecast: any[] = [];

  // Loading and error states
  loading = true;
  errorMessage = '';

  // Load default weather when dashboard starts
  ngOnInit(): void {
      this.loadFavorites();
    this.loadWeather('Colombo');
    this.loadRecentCities();
  }

  // Search weather by city
  loadWeather(city: string): void {

    const searchCity = city.trim();

    // Validate city input
    if (!searchCity) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    // Start loading
    this.loading = true;
    this.errorMessage = '';

    // Fetch current weather and forecast together
    forkJoin({
      current: this.weatherService.getCurrentWeather(searchCity),
      forecast: this.weatherService.getForecast(searchCity)
    }).subscribe({

      // Successful API response
      next: (result) => {
        console.log('API DATA RECEIVED:', result);
console.log('Before loading false:', this.loading);

        // Current weather
        this.weatherData = result.current;

        // Forecast information
        const data = result.forecast;

        this.forecastData = data.list.slice(0, 6);

        // Prepare daily forecast
        const dailyData: any = {};

        data.list.forEach((item: any) => {

          const date = new Date(item.dt * 1000).toLocaleDateString();

          if (!dailyData[date]) {

            dailyData[date] = {
              date: item.dt,
              tempMin: item.main.temp_min,
              tempMax: item.main.temp_max,
              weather: item.weather[0].main,
              description: item.weather[0].description
            };

          } else {

            dailyData[date].tempMin = Math.min(
              dailyData[date].tempMin,
              item.main.temp_min
            );

            dailyData[date].tempMax = Math.max(
              dailyData[date].tempMax,
              item.main.temp_max
            );

          }

        });

        // Display up to five forecast days
        this.dailyForecast = Object.values(dailyData).slice(0, 5);

        // Stop loading
      
        this.loading = false;
        this.cdr.detectChanges();
        console.log('After loading false:', this.loading);

        console.log('Weather loaded successfully:', this.weatherData);

        this.addRecentCity(this.weatherData.name);
      },

      // API error handling
      error: (error) => {

        console.error('Weather API error:', error);

        this.weatherData = null;
        this.forecastData = [];
        this.dailyForecast = [];

        if (error.status === 401) {

          this.errorMessage =
            'Invalid API key. Please check your OpenWeather API key.';

        } else if (error.status === 404) {

          this.errorMessage =
            'City not found. Please enter a valid city name.';

        } else if (error.status === 429) {

          this.errorMessage =
            'API request limit reached. Please try again later.';

        } else {

          this.errorMessage =
            'Unable to load weather. Please check your internet connection and try again.';

        }

        // Stop loading even when API fails
        this.loading = false;

      }

    });

  }

}
