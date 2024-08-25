import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { User } from "../../features/dashboard/users/models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NotifierService } from "./notifier.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();
  private validToken = "ajksfbajkwhfqiwn";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notifier: NotifierService
  ) {}

  login(data: { email: string; password: string; role: string }) {
    this.httpClient
      .get<User[]>(environment.apiUrl + "/users", {
        params: {
          email: data.email,
          password: data.password,
          role: data.role,
        },
      })
      .subscribe({
        next: (response) => {
          const user = response.find(
            (u) =>
              u.email === data.email &&
              u.password === data.password &&
              u.role === data.role
          );
          if (!user) {
            this.notifier.sendNotification("Usuario invalido");
          } else {
            const authUser = response[0];
            localStorage.setItem("token", authUser.token);
            localStorage.setItem(
              "userName",
              authUser.firstName + " " + authUser.lastName
            );
            localStorage.setItem("userRole", user.role);
            this._authUser$.next(authUser);
            this.router.navigate(["dashboard", "home"]);
          }
        },
        error: (error) => {
          this.notifier.sendNotification("Error al iniciar sesion");
        },
      });
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem("token");
    if (!token) {
      return of(false);
    }
    return this.httpClient
      .get<User[]>(environment.apiUrl + "/users", {
        params: {
          token: token,
        },
      })
      .pipe(
        map((response) => {
          if (!response.length) {
            return false;
          } else {
            const authUser = response[0];
            localStorage.setItem("token", authUser.token);
            this._authUser$.next(authUser);
            return true;
          }
        })
      );
  }

  obtenerUsuarioAutenticado() {
    return localStorage.getItem("userName");
  }

  logout() {
    localStorage.removeItem("token");
    this._authUser$.next(null);
    this.router.navigate(["auth", "login"]);
  }

  obtenerUsuarioPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("Error desconocido");

      setTimeout(() => {
        resolve({
          name: "Name fake",
          email: "fake@mail.com",
        });
      }, 2000);
    });
  }
}
