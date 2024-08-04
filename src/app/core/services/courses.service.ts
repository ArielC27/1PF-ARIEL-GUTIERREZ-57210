import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../features/dashboard/courses/models/course";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class CoursesService {
  // private MY_DATABASE = [
  //   {
  //     id: 'jDcd2',
  //     name: 'Angular',
  //     endDate: new Date(),
  //     startDate: new Date(),
  //   },
  //   {
  //     id: 'jDcd3',
  //     name: 'Javascript',
  //     endDate: new Date(),
  //     startDate: new Date(),
  //   },
  //   {
  //     id: 'jDcd5',
  //     name: 'Photoshop',
  //     endDate: new Date(),
  //     startDate: new Date(),
  //   },
  // ];

  // editCourseById(id: string, update: Course) {
  //   this.MY_DATABASE = this.MY_DATABASE.map((el) =>
  //     el.id === id ? { ...update, id } : el
  //   );
  //   return this.getCourses();
  // }

  // getCourses(): Observable<Course[]> {
  //   return new Observable((observer) => {
  //     setTimeout(() => {
  //       observer.next(this.MY_DATABASE);
  //       observer.complete();
  //     }, 500);
  //   });
  // }

  // addCourse(course: Course): Observable<Course[]> {
  //   this.MY_DATABASE.push(course);
  //   return this.getCourses();
  // }

  // deleteCourseById(id: string): Observable<Course[]> {
  //   this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
  //   return this.getCourses();
  // }

  constructor(private httpCliente: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.httpCliente.get<Course[]>(environment.apiUrl + "/courses");
  }

  addCourse(course: Course) {
    return this.httpCliente.post<Course>(
      environment.apiUrl + "/courses",
      course
    );
  }

  editCourseById(id: string, update: Course) {
    return this.httpCliente.put<void>(
      environment.apiUrl + "/courses/" + id,
      update
    );
  }

  deleteCourseById(id: string): Observable<void> {
    return this.httpCliente.delete<void>(environment.apiUrl + "/courses/" + id);
  }
}
