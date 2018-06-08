import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPasswordComponent } from './client-password.component';

describe('ClientPasswordComponent', () => {
  let component: ClientPasswordComponent;
  let fixture: ComponentFixture<ClientPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
