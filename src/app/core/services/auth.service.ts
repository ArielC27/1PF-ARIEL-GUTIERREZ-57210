import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { User } from "../../features/dashboard/users/models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();
  private validToken = "ajksfbajkwhfqiwn";

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    this.httpClient
      .get<User[]>(environment.apiUrl + "/users", {
        params: {
          email: data.email,
          password: data.password,
        },
      })
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert("Usuario o password invalido");
          } else {
            const authUser = response[0];
            localStorage.setItem("token", authUser.token);
            localStorage.setItem(
              "userName",
              authUser.firstName + " " + authUser.lastName
            );
            this._authUser$.next(authUser);
            this.router.navigate(["dashboard", "home"]);
          }
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

  obtenerUsuarioObservable() {
    // return new Observable((observer) => {
    //   setInterval(() => {
    //     observer.next({
    //       name: "Name fake",
    //       email: "fake@mail.com",
    //     });
    //     // observer.complete();
    //     // observer.error('Error desconocido');
    //   }, 2000);
    // });
    //return localStorage.getItem("userName");
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
