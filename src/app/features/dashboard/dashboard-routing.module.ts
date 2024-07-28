import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { CoursesComponent } from "./courses/courses.component";
import { StudentsComponent } from "./students/students.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
