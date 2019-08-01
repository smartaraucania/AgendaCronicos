import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasAtencionesComponent } from './proximas-atenciones.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule, MatTableModule, MatPaginatorModule } from '@angular/material';

describe('ProximasAtencionesComponent', () => {
  let component: ProximasAtencionesComponent;
  let fixture: ComponentFixture<ProximasAtencionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximasAtencionesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximasAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
