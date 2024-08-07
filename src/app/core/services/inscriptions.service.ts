import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Inscripcion } from "../../features/dashboard/inscripciones/models/inscripcion";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class InscriptionsService {
  constructor(private httpCliente: HttpClient) {}

  getInscriptions(): Observable<Inscripcion[]> {
    return this.httpCliente.get<Inscripcion[]>(
      environment.apiUrl + "/inscripciones"
    );
  }

  addInscription(inscription: Inscripcion) {
    return this.httpCliente.post<Inscripcion>(
      environment.apiUrl + "/inscripciones",
      inscription
    );
  }

  editInscriptionById(id: string, update: Inscripcion) {
    return this.httpCliente.put<void>(
      environment.apiUrl + "/inscripciones/" + id,
      update
    );
  }

  deleteInscriptionById(id: string): Observable<void> {
    return this.httpCliente.delete<void>(
      environment.apiUrl + "/inscripciones/" + id
    );
  }
}
