import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InscriptionDialogComponent } from "./inscription-dialog.component";
import { CommonModule } from "@angular/common";
import { InscripcionesRoutingModule } from "../../inscripciones-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatOptionModule,
} from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

xdescribe("InscriptionDialogComponent", () => {
  let component: InscriptionDialogComponent;
  let fixture: ComponentFixture<InscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionDialogComponent],
      imports: [
        CommonModule,
        InscripcionesRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatOptionModule,
        MatSelectModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: DateAdapter,
          useValue: {},
        },
        {
          provide: MAT_DATE_FORMATS,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
