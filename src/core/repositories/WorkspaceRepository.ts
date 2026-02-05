import { ApiResponse } from "../entities/IResponse";
import { OnboardingData } from "@/lib/types/onboarding";

export interface Workspace {
  id: number;
  slug: string;
  name: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface WorkspaceResult {
  success: boolean;
  workspace?: Workspace;
  message?: string;
}

export interface WorkspaceListResult {
  success: boolean;
  workspaces?: Workspace[];
  message?: string;
}


export interface WorkspaceRepository {
  create(data: OnboardingData, token: string): Promise<ApiResponse>;
  getWorkspaceBySlug(slug: string): Promise<Workspace | null>;
  switchWorkspace(workspaceId: number): Promise<WorkspaceResult>;
  getUserWorkspaces(): Promise<WorkspaceListResult>;
}