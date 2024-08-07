import { Component } from "@angular/core";
import { Inscripcion } from "./models/inscripcion";
import { MatDialog } from "@angular/material/dialog";
import { InscriptionsService } from "../../../core/services/inscriptions.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InscriptionDialogComponent } from "./components/inscription-dialog/inscription-dialog.component";

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

  inscription: Inscripcion[] = [];
  isLoading = false;
  constructor(
    private matDialog: MatDialog,
    private inscriptionsService: InscriptionsService
  ) {}

  ngOnInit(): void {
    this.loadInscriptions();
  }
  loadInscriptions() {
    this.isLoading = true;
    this.inscriptionsService.getInscriptions().subscribe({
      next: (inscriptionFromDB) => {
        this.inscription = inscriptionFromDB;
        console.log("Inscriptions received:", this.inscription);
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
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(InscriptionDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addInscription(result);
      }
    });
  }

  addInscription(inscription: Inscripcion): void {
    this.isLoading = true;
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

  editInscription(editingInscription: Inscripcion): void {
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
    if (confirm("¿Está seguro de que desea eliminar la inscripcion del estudiante?")) {
      this.isLoading = true;

      this.inscriptionsService.deleteInscriptionById(inscription.id).subscribe({
        next: () => {
          // Filtra el estudiante eliminado de la lista actual
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
