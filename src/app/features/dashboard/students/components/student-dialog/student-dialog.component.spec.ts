import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentDialogComponent } from "./student-dialog.component";
import { CommonModule } from "@angular/common";
import { StudentsRoutingModule } from "../../students-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";

xdescribe("StudentDialogComponent", () => {
  let component: StudentDialogComponent;
  let fixture: ComponentFixture<StudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDialogComponent],
      imports: [
        CommonModule,
        StudentsRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatTableModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
