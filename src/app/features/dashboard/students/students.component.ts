import { Component } from "@angular/core";
import { Student } from "./models/student";
import { MatDialog } from "@angular/material/dialog";
import { StudentsService } from "../../../core/services/students.service";
import { StudentDialogComponent } from "./components/student-dialog/student-dialog.component";
import { generateId } from "../../../shared/utils";

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
    "actions"
  ];
  dataSource: Student[] = [];
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
      next: (students) => {
        this.dataSource = students;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          console.log("RECIBIMOS ESTE VALOR: ", value);

          this.nombreAlumno = value.name;

          value["id"] = generateId(5);
          this.isLoading = true;
          this.studentsService.addStudent(value).subscribe({
            next: (students) => {
              this.dataSource = [...students];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
  }

  editStudent(editingStudent: Student) {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.studentsService
              .editStudentById(editingStudent.id, value)
              .subscribe({
                next: (students) => {
                  this.dataSource = [...students];
                },
              });
          }
        },
      });
  }

  deleteStudentById(student: Student) {
    if (confirm("Esta seguro?")) {
      this.isLoading = true;

      this.studentsService.deleteStudentById(student.id).subscribe({
        next: (students) => {
          this.dataSource = [...students];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
