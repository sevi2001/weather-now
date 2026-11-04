import { WEATHER_API_KEY } from './weather-api-key';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  private apiKey = WEATHER_API_KEY;

  private currentWeatherUrl =
    'https://api.openweathermap.org/data/2.5/weather';

  private forecastUrl =
    'https://api.openweathermap.org/data/2.5/forecast';

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get<any>(this.currentWeatherUrl, {
      params: {
        q: city,
        appid: this.apiKey,
        units: 'metric'
      }
    });
  }

  getForecast(city: string): Observable<any> {
    return this.http.get<any>(this.forecastUrl, {
      params: {
        q: city,
        appid: this.apiKey,
        units: 'metric'
      }
    });
  }
}
