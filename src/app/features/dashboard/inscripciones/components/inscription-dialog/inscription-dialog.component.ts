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
      idStudent: [this.students.length > 0 ? this.students[0].id : ""],
      nameStudent: [
        this.students.length > 0
          ? `${this.students[0].firstName} ${this.students[0].lastName}`
          : "",
      ],
      idCourse: [this.courses.length > 0 ? this.courses[0].id : ""],
      nameCourse: [this.courses.length > 0 ? this.courses[0].name : ""],
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

      if (!this.editingInscription) {
        formValue.idStudent = formValue.nameStudent?.id;
        formValue.idCourse = formValue.nameCourse?.id;

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

  selectedChangeStudent(student: any) {
    if (student && student.id) {
      this.inscripcionForm.get("idStudent")?.setValue(student.id);
      this.inscripcionForm
        .get("nameStudent")
        ?.setValue(`${student.firstName} ${student.lastName}`);
    }
  }

  selectedChangeCourse(course: any) {
    if (course && course.id) {
      this.inscripcionForm.get("idCourse")?.setValue(course.id);
      this.inscripcionForm.get("nameCourse")?.setValue(course.name);
    }
  }
}
