import { AuthUseCase } from "@/application/use-cases/AuthUseCase";
import { APIAuthRepository } from "@/infrastructure/repositories/APIAuthRepository";
import { WorkspaceUseCase } from "@/application/use-cases/WorkspaceUseCase";
import { APIWorkspaceRepository } from "@/infrastructure/repositories/APIWorkspaceRepository";

const authRepo = new APIAuthRepository();
// --- Workspace Module ---
const workspaceRepo = new APIWorkspaceRepository();

const authUseCase = new AuthUseCase(authRepo, workspaceRepo);
const workspaceUseCase = new WorkspaceUseCase(workspaceRepo);

export { authUseCase, workspaceUseCase };