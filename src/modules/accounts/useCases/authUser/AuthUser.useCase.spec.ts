import { AppError } from "@shared/errors/AppError";
import { IUserDto } from "@modules/accounts/dtos/IUser.dto";
import { UserRepositoryInMemory } from "@modules/accounts/iRepositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/iRepositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/providers/DateProvider/DayjsDateProvider";
import { CreateUserUseCase } from "../createUser/CreateUser.useCase";
import { AuthUserUseCase } from "./AuthUser.useCase";

let authUserUseCase: AuthUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider

let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authUserUseCase = new AuthUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: IUserDto = {
      name: "John Doe",
      email: "johndoe@fakemail.com",
      password: "123456",
      isAdmin: true,
    };

    await createUserUseCase.execute(user);

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authUserUseCase.execute({
        email: "fake.mail@fake.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: IUserDto = {
        name: "Dona Doe",
        email: "donadoe@fakemail.com",
        password: "654321",
        isAdmin: false,
      };

      await createUserUseCase.execute(user);

      await authUserUseCase.execute({
        email: user.email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
