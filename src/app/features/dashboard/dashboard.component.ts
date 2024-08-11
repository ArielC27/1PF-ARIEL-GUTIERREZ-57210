import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { Observable } from "rxjs";
import { User } from "./users/models/user";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  authUser$: Observable<User | null>;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
  ngOnInit() {
    const userRole = localStorage.getItem("userRole");
    this.isAdmin = userRole === "ADMIN";
  }

  logout() {
    this.authService.logout();
  }
}
