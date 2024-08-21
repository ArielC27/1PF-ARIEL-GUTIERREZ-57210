import { TestBed, tick } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MockProvider } from "ng-mocks";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("AuthService", () => {
  let service: AuthService;
  let router: Router;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(Router),
        MockProvider(HttpClient),
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Al llamar login con credenciales validas, debe redireccionar al dashboard/home", () => {
    const spyOnNavigate = spyOn(router, "navigate");
    const mockUserResponse = [
      { email: "test@example.com", password: "password123", role: "user", token: "mockToken", firstName: "John", lastName: "Doe" },
    ];

    spyOn(httpClient, 'get').and.returnValue(of(mockUserResponse));

    const loginData = {
      email: "test@example.com",
      password: "password123",
      role: "user",
    };

    service.login(loginData);

    expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
  });
});
