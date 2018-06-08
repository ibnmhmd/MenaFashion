import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSliderComponent } from './trending-slider.component';

describe('TrendingSliderComponent', () => {
  let component: TrendingSliderComponent;
  let fixture: ComponentFixture<TrendingSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
