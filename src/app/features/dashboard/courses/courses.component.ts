import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CourseDialogComponent } from "./components/course-dialog/course-dialog.component";
import { Course } from "./models/course";
import { CoursesService } from "../../../core/services/courses.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.scss",
})
export class CoursesComponent {
  nombreCurso = "";
  displayedColumns: string[] = [
    "id",
    "name",
    "startDate",
    "endDate",
    "actions",
  ];

  columnsResult = {
    id: "#",
    name: "Nombre",
    startDate: "Fecha Inicio",
    endDate: "Fecha Fin",
    actions: "Acciones",
  };

  course: Course[] = [];
  isLoading = false;
  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courseFromDB) => {
        this.course = courseFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert("Cursos no encontrados");
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(CourseDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCourse(result);
      }
    });
  }

  addCourse(course: Course): void {
    this.isLoading = true;
    this.coursesService.addCourse(course).subscribe({
      next: (addedCourse: Course) => {
        this.course.push(addedCourse);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          alert("Error al agregar el curso");
        }
      },
      complete: () => {
        this.isLoading = false;
        this.loadCourses();
      },
    });
  }

  editCourse(editingCourse: Course): void {
    this.matDialog
      .open(CourseDialogComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (updateCourse) => {
          if (updateCourse) {
            this.isLoading = true;
            this.coursesService
              .editCourseById(editingCourse.id, updateCourse)
              .subscribe({
                next: () => {
                  this.isLoading = false;
                },
                error: (error) => {
                  if (error instanceof HttpErrorResponse) {
                    alert("Error al editar el curso");
                  }
                  this.isLoading = false;
                },
                complete: () => {
                  this.isLoading = false;
                  this.loadCourses();
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

  deleteCourseById(course: Course) {
    if (confirm("¿Está seguro de que desea eliminar este estudiante?")) {
      this.isLoading = true;

      this.coursesService.deleteCourseById(course.id).subscribe({
        next: () => {
          // Filtra el estudiante eliminado de la lista actual
          this.course = this.course.filter((s) => s.id !== course.id);
          this.isLoading = false;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("Error al eliminar el curso");
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.loadCourses();
        },
      });
    }
  }
}
