import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "courses",
        loadChildren: () =>
          import("./courses/courses.module").then((m) => m.CoursesModule),
      },
      {
        path: "students",
        loadChildren: () =>
          import("./students/students.module").then((m) => m.StudentsModule),
      },
      {
        path: "inscriptions",
        loadChildren: () =>
          import("./inscripciones/inscripciones.module").then(
            (m) => m.InscripcionesModule
          ),
      },
      {
        path: "**",
        redirectTo: "/dashboard/home",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
