import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosComponent } from './miembros.component';

describe('ConsultarmiembrosComponent', () => {
  let component: MiembrosComponent;
  let fixture: ComponentFixture<MiembrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiembrosComponent]
    });
    fixture = TestBed.createComponent(MiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
