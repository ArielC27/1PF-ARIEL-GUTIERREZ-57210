import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  @ViewChild("drawer") referenciaSidebar!: MatDrawer;

  constructor() {}

  onToggle() {
    this.referenciaSidebar.toggle();
  }
}
