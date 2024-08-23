// import { Component, Inject } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
// import { InscripcionData } from "../../models/inscripcionData";

// @Component({
//   selector: "app-inscription-dialog",
//   templateUrl: "./inscription-dialog.component.html",
//   styleUrl: "./inscription-dialog.component.scss",
// })
// export class InscriptionDialogComponent {
//   inscripcionForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private matDialogRef: MatDialogRef<InscriptionDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public editingInscription?: InscripcionData
//   ) {
//     this.inscripcionForm = this.fb.group({
//       idStudent: ["", Validators.required],
//       nameStudent: ["", Validators.required],
//       idCourse: ["", Validators.required],
//       nameCourse: ["", Validators.required],
//       enrollmentDate: ["", Validators.required],
//       status: ["", Validators.required],
//       isActive: [false],
//     });

//     if (this.editingInscription) {
//       // Patch valores incluyendo IDs
//       this.inscripcionForm.patchValue({
//         idStudent: this.editingInscription.idStudent,
//         nameStudent: this.editingInscription.nameStudent,
//         idCourse: this.editingInscription.idCourse,
//         nameCourse: this.editingInscription.nameCourse,
//         enrollmentDate: this.editingInscription.enrollmentDate,
//         status: this.editingInscription.status,
//         isActive: this.editingInscription.isActive,
//       });
//     }
//   }

//   onSubmit(): void {
//     if (this.inscripcionForm.valid) {
//       // Devuelve el formulario completo con IDs incluidos
//       this.matDialogRef.close(this.inscripcionForm.value);
//     }
//   }
// }

import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InscripcionData } from "../../models/inscripcionData";
import { Student } from "../../../students/models/student";
import { Course } from "../../../courses/models/course";
import { StudentsService } from "../../../../../core/services/students.service";
import { CoursesService } from "../../../../../core/services/courses.service";

@Component({
  selector: "app-inscription-dialog",
  templateUrl: "./inscription-dialog.component.html",
  styleUrls: ["./inscription-dialog.component.scss"],
})
export class InscriptionDialogComponent implements OnInit {
  inscripcionForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public editingInscription?: InscripcionData
  ) {
    this.inscripcionForm = this.fb.group({
      idStudent: ["", Validators.required],
      nameStudent: ["", Validators.required],
      idCourse: ["", Validators.required],
      nameCourse: ["", Validators.required],
      enrollmentDate: ["", Validators.required],
      status: ["", Validators.required],
      isActive: [false],
    });

    if (this.editingInscription) {
      this.inscripcionForm.patchValue(this.editingInscription);
    }
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      const formValue = this.inscripcionForm.value;

      // Mapear los IDs a los nombres si es una inserción
      if (!this.editingInscription) {
        const selectedStudent = this.students.find(
          (student) => student.id === formValue.idStudent
        );
        const selectedCourse = this.courses.find(
          (course) => course.id === formValue.idCourse
        );

        formValue.nameStudent = selectedStudent
          ? `${selectedStudent.firstName} ${selectedStudent.lastName}`
          : "";
        formValue.nameCourse = selectedCourse ? selectedCourse.name : "";
      }

      this.matDialogRef.close(formValue);
    }
  }
}
