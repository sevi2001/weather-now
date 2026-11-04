
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  // ==============================
  // SERVICES
  // ==============================

  private cdr = inject(ChangeDetectorRef);
  private weatherService = inject(WeatherService);

  // ==============================
  // DASHBOARD INFORMATION
  // ==============================

  title = 'WeatherNow';
  today = new Date();

  // ==============================
  // WEATHER DATA
  // ==============================

  weatherData: any = null;
  forecastData: any[] = [];
  dailyForecast: any[] = [];

  loading = true;
  errorMessage = '';

  // ==============================
  // TEMPERATURE UNIT
  // ==============================

  unit: 'C' | 'F' = 'C';

  toggleTemperature(): void {
    this.unit = this.unit === 'C' ? 'F' : 'C';
  }

  convertTemperature(temp: number): number {
    if (this.unit === 'C') {
      return temp;
    }

    return (temp * 9 / 5) + 32;
  }

  // ==============================
  // FAVORITE CITIES
  // ==============================

  favoriteCities: string[] = [];

  loadFavorites(): void {
    try {
      const savedFavorites = localStorage.getItem('weatherFavorites');

      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);

        this.favoriteCities = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Error loading favorite cities:', error);
      this.favoriteCities = [];
    }
  }

  toggleFavorite(): void {
    if (!this.weatherData) {
      return;
    }

    const city = this.weatherData.name;

    const alreadyFavorite = this.favoriteCities.some(
      favorite => favorite.toLowerCase() === city.toLowerCase()
    );

    if (alreadyFavorite) {
      this.favoriteCities = this.favoriteCities.filter(
        favorite => favorite.toLowerCase() !== city.toLowerCase()
      );
    } else {
      this.favoriteCities.push(city);
    }

    localStorage.setItem(
      'weatherFavorites',
      JSON.stringify(this.favoriteCities)
    );
  }

  isFavorite(): boolean {
    return this.weatherData
      ? this.favoriteCities.some(
          favorite =>
            favorite.toLowerCase() === this.weatherData.name.toLowerCase()
        )
      : false;
  }

  selectFavorite(city: string): void {
    this.loadWeather(city);
  }

  // ==============================
  // RECENT SEARCH HISTORY
  // ==============================

  recentCities: string[] = [];

  loadRecentCities(): void {
    try {
      const savedCities = localStorage.getItem('recentCities');

      if (savedCities) {
        const parsed = JSON.parse(savedCities);

        this.recentCities = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Error loading recent cities:', error);
      this.recentCities = [];
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

  // ==============================
  // INITIALIZE APPLICATION
  // ==============================

  ngOnInit(): void {
    this.loadFavorites();
    this.loadRecentCities();

    this.loadWeather('Colombo');
  }

  // ==============================
  // LOAD WEATHER DATA
  // ==============================

  loadWeather(city: string): void {

    const searchCity = city.trim();

    if (!searchCity) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      current: this.weatherService.getCurrentWeather(searchCity),
      forecast: this.weatherService.getForecast(searchCity)
    }).subscribe({

      // SUCCESS
      next: (result) => {

        console.log('WEATHER API DATA:', result);

        // Current weather
        this.weatherData = result.current;

        // Forecast information
        const data = result.forecast;

        this.forecastData = data.list.slice(0, 6);

        // Prepare daily forecast
        const dailyData: any = {};

        data.list.forEach((item: any) => {

          const date = new Date(
            item.dt * 1000
          ).toLocaleDateString();

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

        // Save recent search
        this.addRecentCity(this.weatherData.name);

        // Stop loading
        this.loading = false;

        this.cdr.detectChanges();

        console.log('Weather loaded successfully:', this.weatherData);

      },

      // ERROR
      error: (error) => {

        console.error('WEATHER API ERROR:', error);
        console.error('HTTP STATUS:', error.status);
        console.error('ERROR MESSAGE:', error.message);
        console.error('SERVER RESPONSE:', error.error);

        this.weatherData = null;
        this.forecastData = [];
        this.dailyForecast = [];

        if (error.status === 0) {

          this.errorMessage =
            'Unable to connect to the weather server. Please check your connection or API server.';

        } else if (error.status === 401) {

          this.errorMessage =
            'Invalid API key. Please check your OpenWeather API key.';

        } else if (error.status === 404) {

          this.errorMessage =
            'City not found or weather API endpoint unavailable.';

        } else if (error.status === 429) {

          this.errorMessage =
            'API request limit reached. Please try again later.';

        } else if (error.status >= 500) {

          this.errorMessage =
            'Weather server error. Please try again later.';

        } else {

          this.errorMessage =
            error.error?.message ||
            'Unable to load weather. Please try again.';

        }

        // Stop loading even when API fails
        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }

}
