import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReversePipe } from "./pipes/reverse.pipe";
import { ResaltadoDirective } from "./directives/resaltado.directive";
import { RepetirDirective } from "./directives/repetir.directive";
import { GenericListComponent } from "./components/generic-list/generic-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { UppercasePipe } from "./pipes/uppercase/uppercase.pipe";
import { ChangeFontsizeDirective } from "./directives/change-fontsize.directive";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule, MatNavList } from "@angular/material/list";
import { DashboardRoutingModule } from "../features/dashboard/dashboard-routing.module";

@NgModule({
  declarations: [
    ReversePipe,
    ResaltadoDirective,
    RepetirDirective,
    GenericListComponent,
    UppercasePipe,
    ChangeFontsizeDirective,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    DashboardRoutingModule,
  ],
  exports: [
    ReversePipe,
    ResaltadoDirective,
    RepetirDirective,
    GenericListComponent,
    SidebarComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
