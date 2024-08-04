import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../../features/dashboard/students/models/student";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class StudentsService {
  constructor(private httpCliente: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpCliente.get<Student[]>(environment.apiUrl + "/students");
  }

  addStudent(student: Student) {
    return this.httpCliente.post<Student>(
      environment.apiUrl + "/students",
      student
    );
  }

  editStudentById(id: string, update: Student) {
    return this.httpCliente.put<void>(
      environment.apiUrl + "/students/" + id,
      update
    );
  }

  deleteStudentById(id: string): Observable<void> {
    return this.httpCliente.delete<void>(environment.apiUrl + "/students/" + id);
  }
}
