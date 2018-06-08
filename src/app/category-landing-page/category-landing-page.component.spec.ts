import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLandingPageComponent } from './category-landing-page.component';

describe('CategoryLandingPageComponent', () => {
  let component: CategoryLandingPageComponent;
  let fixture: ComponentFixture<CategoryLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
