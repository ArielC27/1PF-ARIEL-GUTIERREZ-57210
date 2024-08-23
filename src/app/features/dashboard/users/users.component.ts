import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../../core/services/users.service";
import { User } from "./models/user";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifierService } from "../../../core/services/notifier.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  userForm: FormGroup;
  isLoading = false;
  user: User[] = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private notifier: NotifierService
  ) {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["", [Validators.required]],
    });
  }

  onSubmit(user: User): void {
    this.isLoading = true;
    this.usersService.addUser(user).subscribe({
      next: (addedUser: User) => {
        this.user.push(addedUser);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.notifier.sendNotification("Error al agregar usuario");
        }
      },
      complete: () => {
        this.isLoading = false;
        this.notifier.sendNotification("Usuario agregado correctamente");
        this.userForm.reset();
      },
    });
  }

  onCancel() {
    this.userForm.reset();
  }
}
