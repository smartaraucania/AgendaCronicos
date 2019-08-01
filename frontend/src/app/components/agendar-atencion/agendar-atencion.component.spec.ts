import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarAtencionComponent } from './agendar-atencion.component';

describe('AgendarAtencionComponent', () => {
  let component: AgendarAtencionComponent;
  let fixture: ComponentFixture<AgendarAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
