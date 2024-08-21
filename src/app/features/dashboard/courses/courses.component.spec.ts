import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';

xdescribe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
