import { AuthUseCase } from "@/application/use-cases/AuthUseCase";
import { APIAuthRepository } from "@/infrastructure/repositories/APIAuthRepository";

const authRepo = new APIAuthRepository();
const authUseCase = new AuthUseCase(authRepo);

export { authUseCase };