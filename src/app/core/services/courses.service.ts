import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../features/dashboard/courses/models/course";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class CoursesService {
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
