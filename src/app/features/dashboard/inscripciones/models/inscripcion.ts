export interface Inscripcion {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  status: string;
  isActive: boolean;
}
