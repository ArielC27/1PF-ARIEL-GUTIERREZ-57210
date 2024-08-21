import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';

xdescribe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
