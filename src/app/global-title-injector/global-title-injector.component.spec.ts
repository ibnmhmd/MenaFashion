import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTitleInjectorComponent } from './global-title-injector.component';

describe('GlobalTitleInjectorComponent', () => {
  let component: GlobalTitleInjectorComponent;
  let fixture: ComponentFixture<GlobalTitleInjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTitleInjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTitleInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
