import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../../features/dashboard/students/models/student";

@Injectable({ providedIn: "root" })
export class StudentsService {
  private MY_DATABASE: Student[] = [
    {
      id: "st1234",
      firstName: "Carlos",
      lastName: "Gonzalez",
      address: "123 Calle Principal, Ciudad, País",
      email: "carlos.gonzalez@example.com",
    },
    {
      id: "st1235",
      firstName: "Ana",
      lastName: "Martinez",
      address: "456 Avenida Central, Ciudad, País",
      email: "ana.martinez@example.com",
    },
    {
      id: "st1236",
      firstName: "Luis",
      lastName: "Perez",
      address: "789 Calle Secundaria, Ciudad, País",
      email: "luis.perez@example.com",
    },
    {
      id: "st1237",
      firstName: "María",
      lastName: "Lopez",
      address: "1011 Calle Tercera, Ciudad, País",
      email: "maria.lopez@example.com",
    },
    {
      id: "st1238",
      firstName: "Jorge",
      lastName: "Ramirez",
      address: "1213 Avenida Cuarta, Ciudad, País",
      email: "jorge.ramirez@example.com",
    },
  ];

  editStudentById(id: string, update: Student) {
    this.MY_DATABASE = this.MY_DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getStudents();
  }

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addStudent(student: Student): Observable<Student[]> {
    this.MY_DATABASE.push(student);
    return this.getStudents();
  }

  deleteStudentById(id: string): Observable<Student[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
    return this.getStudents();
  }
}
