import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../../features/dashboard/users/models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();
  private validToken = "ajksfbajkwhfqiwn";

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    localStorage.setItem("token", this.validToken);
    this.router.navigate(["dashboard", "courses"]);
    this._authUser$.next({
      id:"ar1el",
      firstName: "ariel",
      lastName: "gutierrez",
      token: "jnkdfjnadfasf",
      email: "ariel@gmail.com",
      password: "callefalsa123",
      role: "EMPLOYEE",
    });
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem("token");
    return of(this.validToken === token);
  }

  obtenerUsuarioAutenticado() {}

  logout() {
    localStorage.removeItem("token");
    this._authUser$.next(null);
    this.router.navigate(["auth", "login"]);
  }

  obtenerUsuarioObservable(): Observable<any> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next({
          name: "Name fake",
          email: "fake@mail.com",
        });
        // observer.complete();
        // observer.error('Error desconocido');
      }, 2000);
    });
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
