import { BaseProgram } from "./admin";

type OmittedProgram = Omit<BaseProgram, "id" | "parentId" | "children" | "path">;

interface ProgramMenu extends Partial<OmittedProgram> {
  id: string;
  label: string;
  path: string;
  children?: ProgramMenu[];
}

export type { ProgramMenu };
