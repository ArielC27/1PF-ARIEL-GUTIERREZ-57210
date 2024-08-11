import { Component, Inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["agutierrez@mail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
      role: ["ADMIN", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert("El formulario no es valido");
    } else {
      const data = {
        email: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value,
        role: this.loginForm.get("role")?.value,
      };
      this.authService.login(data);
    }
  }
}
