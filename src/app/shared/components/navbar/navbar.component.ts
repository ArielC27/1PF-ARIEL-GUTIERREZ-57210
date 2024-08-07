import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { User } from "../../../features/dashboard/users/models/user";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  @Output() sidebarEmitter = new EventEmitter<void>();
  authUser$: Observable<User | null>;
  userName!: string;

  constructor(protected authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
  ngOnInit(): void {
    this.userName;
    this.authUser$.subscribe((m) => {
      if (m?.firstName && m.lastName) {
        this.userName = m.firstName + " " + m.lastName;
      } else {
        this.userName = this.authService.obtenerUsuarioAutenticado()!;
      }
    });
  }
  onToggleSidebar() {
    this.sidebarEmitter.emit();
  }
}
