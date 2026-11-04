import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyForecast } from './weekly-forecast';

describe('WeeklyForecast', () => {
  let component: WeeklyForecast;
  let fixture: ComponentFixture<WeeklyForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyForecast],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyForecast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
