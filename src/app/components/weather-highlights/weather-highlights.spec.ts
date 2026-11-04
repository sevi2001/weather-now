import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHighlights } from './weather-highlights';

describe('WeatherHighlights', () => {
  let component: WeatherHighlights;
  let fixture: ComponentFixture<WeatherHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherHighlights],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherHighlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
