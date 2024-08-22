import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../features/dashboard/users/models/user";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private httpCliente: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpCliente.get<User[]>(environment.apiUrl + "/users");
  }

  addUser(user: User) {
    return this.httpCliente.post<User>(
      environment.apiUrl + "/users",
      user
    );
  }

  editUserById(id: string, update: User) {
    return this.httpCliente.put<void>(
      environment.apiUrl + "/users/" + id,
      update
    );
  }

  deleteUserById(id: string): Observable<void> {
    return this.httpCliente.delete<void>(environment.apiUrl + "/users/" + id);
  }
}