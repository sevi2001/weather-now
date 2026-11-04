
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  private weatherUrl = '/api/weather';

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get<any>(this.weatherUrl, {
      params: {
        city: city,
        type: 'current'
      }
    });
  }

  getForecast(city: string): Observable<any> {
    return this.http.get<any>(this.weatherUrl, {
      params: {
        city: city,
        type: 'forecast'
      }
    });
  }
}
