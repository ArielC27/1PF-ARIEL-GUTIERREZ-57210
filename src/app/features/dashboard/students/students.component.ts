import { Component } from "@angular/core";
import { Student } from "./models/student";
import { MatDialog } from "@angular/material/dialog";
import { StudentsService } from "../../../core/services/students.service";
import { StudentDialogComponent } from "./components/student-dialog/student-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrl: "./students.component.scss",
})
export class StudentsComponent {
  nombreAlumno = "";
  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "address",
    "email",
    "actions",
  ];

  columnsResult = {
    id: "#",
    firstName: "Nombre",
    lastName: "Apellido",
    address: "Direccion",
    email: "Email",
    actions: "Acciones",
  };

  student: Student[] = [];
  isLoading = false;
  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (studentsFromDB) => {
        this.student = studentsFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert("Estudiantes no encontrados");
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openAddStudentDialog(): void {
    const dialogRef = this.matDialog.open(StudentDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addStudent(result);
      }
    });
  }

  addStudent(student: Student): void {
    this.isLoading = true;
    this.studentsService.addStudent(student).subscribe({
      next: (addedStudent: Student) => {
        this.student.push(addedStudent);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          alert("Error al agregar el estudiante");
        }
      },
      complete: () => {
        this.isLoading = false;
        this.loadStudents();
      },
    });
  }

  editStudent(editingStudent: Student): void {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (updatedStudent) => {
          if (updatedStudent) {
            this.isLoading = true;

            this.studentsService
              .editStudentById(editingStudent.id, updatedStudent)
              .subscribe({
                next: () => {
                  this.isLoading = false;
                },
                error: (error) => {
                  if (error instanceof HttpErrorResponse) {
                    alert("Error al editar el estudiante");
                  }
                  this.isLoading = false;
                },
                complete: () => {
                  this.isLoading = false;
                  this.loadStudents();
                },
              });
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("Error al cerrar el diálogo");
          }
        },
      });
  }

  deleteStudentById(student: Student): void {
    if (confirm("¿Está seguro de que desea eliminar este estudiante?")) {
      this.isLoading = true;

      this.studentsService.deleteStudentById(student.id).subscribe({
        next: () => {
          this.student = this.student.filter((s) => s.id !== student.id);
          this.isLoading = false;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("Error al eliminar el estudiante");
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.loadStudents();
        },
      });
    }
  }
}
