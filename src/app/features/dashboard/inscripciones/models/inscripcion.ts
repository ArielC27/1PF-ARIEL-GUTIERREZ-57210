import { Course } from "../../courses/models/course";
import { Student } from "../../students/models/student";

export interface Inscripcion {
  id: string;
  student: Student;
  course: Course;
  enrollmentDate: Date;
  status: string;
  isActive: boolean;
}
