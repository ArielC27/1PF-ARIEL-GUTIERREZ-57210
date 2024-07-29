import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models/student';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {
    this.studentForm = this.fb.group({
      // idStudent: [this.data?.id || '', Validators.required],
      firstName: [this.data?.firstName || '', [Validators.required, Validators.minLength(3)]],
      lastName: [this.data?.lastName || '', [Validators.required, Validators.minLength(3)]],
      address: [this.data?.address || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
