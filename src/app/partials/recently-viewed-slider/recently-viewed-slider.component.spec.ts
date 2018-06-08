import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedSliderComponent } from './recently-viewed-slider.component';

describe('RecentlyViewedSliderComponent', () => {
  let component: RecentlyViewedSliderComponent;
  let fixture: ComponentFixture<RecentlyViewedSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyViewedSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewedSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
