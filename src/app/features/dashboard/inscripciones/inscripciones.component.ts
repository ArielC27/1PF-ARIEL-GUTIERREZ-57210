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
  loadInscriptions() {
    this.isLoading = true;

    this.courseService.getCourses().subscribe({
      next: (coursesFromDB) => {
        this.courses = coursesFromDB;
        console.log("Cursos received:", this.courses);

        this.studentService.getStudents().subscribe({
          next: (studentsFromDB) => {
            this.students = studentsFromDB;
            console.log("Alumnos received:", this.students);

            this.inscriptionsService.getInscriptions().subscribe({
              next: (inscriptionsFromDB) => {
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
                  };
                });
                console.log("Inscripciones received:", this.inscription);

                this.inscriptionData = this.inscription.map((i) => ({
                  id: i.id,
                  idStudent: i.student.id,
                  nameStudent: i.student.firstName + " " + i.student.lastName,
                  idCourse: i.course.id,
                  nameCourse: i.course.name,
                  enrollmentDate: i.enrollmentDate,
                  status: i.status,
                  isActive: i.isActive,
                }));
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
      student: student ?? ({} as Student),
      course: course ?? ({} as Course),
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
          alert("Error al agregar la inscripción");
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
        next: (updateInscription: InscripcionData) => {
          if (updateInscription) {
            this.isLoading = true;

            const course = this.courses.find(
              (c) => c.id === updateInscription.idCourse
            );
            const student = this.students.find(
              (s) => s.id === updateInscription.idStudent
            );

            if (!course || !student) {
              alert(
                "No se encontró el curso o el estudiante correspondiente. Por favor, verifica los datos."
              );
              this.isLoading = false;
              return;
            }

            const inscription: Inscripcion = {
              id: editingInscription.id,
              course: course,
              student: student,
              enrollmentDate: updateInscription.enrollmentDate,
              status: updateInscription.status,
              isActive: updateInscription.isActive,
            };

            this.inscriptionsService
              .editInscriptionById(inscription.id, inscription)
              .subscribe({
                next: () => {
                  const index = this.inscription.findIndex(
                    (i) => i.id === inscription.id
                  );
                  if (index !== -1) {
                    this.inscription[index] = inscription;

                    this.inscriptionData = this.inscription.map((i) => ({
                      id: i.id,
                      idStudent: i.student.id,
                      nameStudent:
                        i.student.firstName + " " + i.student.lastName,
                      idCourse: i.course.id,
                      nameCourse: i.course.name,
                      enrollmentDate: i.enrollmentDate,
                      status: i.status,
                      isActive: i.isActive,
                    }));
                  }
                  this.isLoading = false;
                },
                error: (error) => {
                  if (error instanceof HttpErrorResponse) {
                    alert("Error al editar la inscripción");
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
