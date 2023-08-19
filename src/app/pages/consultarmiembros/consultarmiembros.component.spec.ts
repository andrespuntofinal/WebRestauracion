import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarmiembrosComponent } from './consultarmiembros.component';

describe('ConsultarmiembrosComponent', () => {
  let component: ConsultarmiembrosComponent;
  let fixture: ComponentFixture<ConsultarmiembrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarmiembrosComponent]
    });
    fixture = TestBed.createComponent(ConsultarmiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
