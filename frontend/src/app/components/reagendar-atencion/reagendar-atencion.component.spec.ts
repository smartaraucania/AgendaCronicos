import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarAtencionComponent } from './reagendar-atencion.component';

describe('ReagendarAtencionComponent', () => {
  let component: ReagendarAtencionComponent;
  let fixture: ComponentFixture<ReagendarAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagendarAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagendarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
