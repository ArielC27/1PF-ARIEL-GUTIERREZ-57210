import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  @Output() sidebarEmitter = new EventEmitter<void>();

  onToggleSidebar() {
    this.sidebarEmitter.emit();
  }
}
