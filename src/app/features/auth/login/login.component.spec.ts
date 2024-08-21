import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "../auth-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        AuthRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("El campo email debe ser requerido", () => {
    const emailControl = component.loginForm.get("email");
    emailControl?.setValue("");
    expect(emailControl?.invalid).toBeTrue();
  });

  it("Al llamar onSubmit, si el formulario es invalido, debe mostrar un alert", () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "",
      password: "",
      role: "",
    });
    const spyOnAlert = spyOn(window, "alert");
    component.onSubmit();
    expect(spyOnAlert).toHaveBeenCalled();
  });

  it("Al llamar a onSubmit, si el formulario es valido, debe llamar a authService.login", () => {
    const loginForm = component.loginForm;
    loginForm.setValue({
      email: "fake@mail.com",
      password: "123456",
      role: "ADMIN",
    });
    const spyOnLogin = spyOn(component.authService, "login");
    component.onSubmit();
    expect(spyOnLogin).toHaveBeenCalled();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
