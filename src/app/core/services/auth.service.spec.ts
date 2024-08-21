import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MockProvider } from "ng-mocks";
import { provideHttpClient } from "@angular/common/http";

describe("AuthService", () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(Router),
        provideHttpClient(),
        provideHttpClient(),
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Al llamar login, debe redireccionar al dashboard", () => {
    const spyOnNavigate = spyOn(router, "navigate");

    const loginData = {
      email: "test@example.com",
      password: "password123",
      role: "user",
    };

    service.login(loginData);

    expect(spyOnNavigate).toHaveBeenCalled();
  });
});
