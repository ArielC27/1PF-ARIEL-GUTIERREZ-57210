import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "courses",
    loadChildren: () =>
      import("../courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "inscriptions",
    loadChildren: () =>
      import("../inscripciones/inscripciones.module").then(
        (m) => m.InscripcionesModule
      ),
  },
  {
    path: "students",
    loadChildren: () =>
      import("../students/students.module").then((m) => m.StudentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
