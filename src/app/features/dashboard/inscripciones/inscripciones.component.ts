import { Component } from "@angular/core";
import { Inscripcion } from "./models/inscripcion";
import { MatDialog } from "@angular/material/dialog";
import { InscriptionsService } from "../../../core/services/inscriptions.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InscriptionDialogComponent } from "./components/inscription-dialog/inscription-dialog.component";
import { Course } from "../courses/models/course";
import { Student } from "../students/models/student";
import { CoursesService } from "../../../core/services/courses.service";
import { StudentsService } from "../../../core/services/students.service";
import { InscripcionData } from "./models/inscripcionData";

@Component({
  selector: "app-inscripciones",
  templateUrl: "./inscripciones.component.html",
  styleUrl: "./inscripciones.component.scss",
})
export class InscripcionesComponent {
  displayedColumns: string[] = [
    "id",
    "nameStudent",
    "nameCourse",
    "enrollmentDate",
    "status",
    "actions",
  ];

  columnsResult = {
    id: "#",
    nameStudent: "Estudiante",
    nameCourse: "Curso",
    enrollmentDate: "Fecha de Inscripcion",
    status: "Estado",
    actions: "Acciones",
  };

  private inscription: Inscripcion[] = [];
  private courses: Course[] = [];
  private students: Student[] = [];
  protected isLoading = false;
  protected inscriptionData: InscripcionData[] = [];

  constructor(
    private matDialog: MatDialog,
    private inscriptionsService: InscriptionsService,
    private courseService: CoursesService,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadInscriptions();
  }

  // loadInscriptions() {
  //   this.isLoading = true;
  //   this.inscriptionsService.getInscriptions().subscribe({
  //     next: (inscriptionFromDB) => {
  //       this.inscription = inscriptionFromDB;
  //       console.log("Inscriptions received:", this.inscription);
  //     },
  //     error: (error) => {
  //       if (error instanceof HttpErrorResponse) {
  //         if (error.status === 404) {
  //           alert("Inscripciones no encontradas");
  //         }
  //       }
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     },
  //   });
  // }
  loadInscriptions() {
    this.isLoading = true;

    // Cargar cursos
    this.courseService.getCourses().subscribe({
      next: (coursesFromDB) => {
        this.courses = coursesFromDB;
        console.log("Cursos received:", this.courses);

        // Cargar alumnos después de obtener los cursos
        this.studentService.getStudents().subscribe({
          next: (studentsFromDB) => {
            this.students = studentsFromDB;
            console.log("Alumnos received:", this.students);

            // Cargar inscripciones después de obtener cursos y alumnos
            this.inscriptionsService.getInscriptions().subscribe({
              next: (inscriptionsFromDB) => {
                // Asocia los cursos y alumnos a las inscripciones
                this.inscription = inscriptionsFromDB.map((inscription) => {
                  const course = this.courses.find(
                    (c) => c.id === inscription.course.id
                  );
                  const student = this.students.find(
                    (s) => s.id === inscription.student.id
                  );
                  return {
                    ...inscription,
                    course: course ?? ({} as Course),
                    student: student ?? ({} as Student),

                    // nameCourse: course ? course.name : "Curso no encontrado",
                    // nameStudent: student
                    //   ? student.firstName + student.lastName
                    //   : "Alumno no encontrado",
                  };
                });
                console.log("Inscripciones received:", this.inscription);

                if (this.inscription.length > 0) {
                  this.inscription.map((i) => {
                    this.inscriptionData.push({
                      id: i.id,
                      idStudent: i.student.id,
                      nameStudent:
                        i.student.lastName + " " + i.student.lastName,
                      idCourse: i.course.id,
                      nameCourse: i.course.name,
                      isActive: i.status === "Activo",
                      status: i.status,
                      enrollmentDate: i.enrollmentDate,
                    });
                  });
                }
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status === 404) {
                    alert("Inscripciones no encontradas");
                  }
                }
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          },
          error: (error) => {
            console.error("Error al cargar los alumnos:", error);
          },
        });
      },
      error: (error) => {
        console.error("Error al cargar los cursos:", error);
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(InscriptionDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addInscription(result);
      }
    });
  }

  addInscription(inscriptionData: InscripcionData): void {
    this.isLoading = true;

    const course = this.courses.find((c) => c.id === inscriptionData.idCourse);
    const student = this.students.find(
      (s) => s.id === inscriptionData.idStudent
    );

    const inscription: Inscripcion = {
      id: inscriptionData.id,
      course: course ?? ({} as Course),
      student: student ?? ({} as Student),
      enrollmentDate: inscriptionData.enrollmentDate,
      status: inscriptionData.status,
      isActive: inscriptionData.isActive,
    };

    this.inscriptionsService.addInscription(inscription).subscribe({
      next: (addedInscription: Inscripcion) => {
        this.inscription.push(addedInscription);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          alert("Error al agregar la inscripcion");
        }
      },
      complete: () => {
        this.isLoading = false;
        this.loadInscriptions();
      },
    });
  }

  editInscription(editingInscription: InscripcionData): void {
    this.matDialog
      .open(InscriptionDialogComponent, { data: editingInscription })
      .afterClosed()
      .subscribe({
        next: (updateInscription) => {
          if (updateInscription) {
            this.isLoading = true;
            this.inscriptionsService
              .editInscriptionById(editingInscription.id, updateInscription)
              .subscribe({
                next: () => {
                  this.isLoading = false;
                },
                error: (error) => {
                  if (error instanceof HttpErrorResponse) {
                    alert("Error al editar la inscripcion");
                  }
                  this.isLoading = false;
                },
                complete: () => {
                  this.isLoading = false;
                  this.loadInscriptions();
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

  deleteInscriptionById(inscription: Inscripcion) {
    if (
      confirm(
        "¿Está seguro de que desea eliminar la inscripcion del estudiante?"
      )
    ) {
      this.isLoading = true;

      this.inscriptionsService.deleteInscriptionById(inscription.id).subscribe({
        next: () => {
          this.inscription = this.inscription.filter(
            (s) => s.id !== inscription.id
          );
          this.isLoading = false;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("Error al eliminar la inscripcion");
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.loadInscriptions();
        },
      });
    }
  }
}
