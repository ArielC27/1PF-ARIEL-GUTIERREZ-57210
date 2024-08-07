import { NgModule } from "@angular/core";
import { InscripcionesComponent } from "./inscripciones.component";
import { InscriptionDialogComponent } from "./components/inscription-dialog/inscription-dialog.component";
import { CommonModule } from "@angular/common";
import { InscripcionesRoutingModule } from "./inscripciones-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../../../shared/shared.module";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [InscripcionesComponent, InscriptionDialogComponent],
  exports: [InscripcionesComponent],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule,
  ],
})
export class InscripcionesModule {}
