import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseDialogComponent } from '../../../courses/components/course-dialog/course-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent?: Student
  ) {
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
    });

    if (this.editingStudent) {
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.matDialogRef.close(this.studentForm.value);
    } else {
      /// mostar error
    }
  }
}
