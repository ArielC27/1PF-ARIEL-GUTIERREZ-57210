import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InscripcionData } from "../../models/inscripcionData";

@Component({
  selector: "app-inscription-dialog",
  templateUrl: "./inscription-dialog.component.html",
  styleUrl: "./inscription-dialog.component.scss",
})
export class InscriptionDialogComponent {
  inscripcionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingInscription?: InscripcionData
  ) {
    this.inscripcionForm = this.fb.group({
      nameStudent: ["", Validators.required],
      nameCourse: ["", Validators.required],
      enrollmentDate: ["", Validators.required],
      status: ["", Validators.required],
      isActive: [false],
    });

    if (this.editingInscription) {
      this.inscripcionForm.patchValue(this.editingInscription);
    }
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      this.matDialogRef.close(this.inscripcionForm.value);
    } else {
    }
  }
}
