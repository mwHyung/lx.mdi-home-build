import { PageParams } from "./shared";

interface User {
  id: number;
  userId: string;
  fullName?: string;
  lastName?: string;
  firstName?: string;
  role: Role["id"];
  roleName: Role["roleName"];
  email: string;
  isActive: boolean;
  isGoogleUser: boolean;
  dateJoined: string;
}

interface Role {
  id: number;
  roleCode: string;
  roleName: string;
  description: string;
  isActive: boolean;
  groupEmail?: string;
}

interface Code {
  id: number;
  codegroup: string | number;
  codeLevel: number;
  code: string;  //코드그룹, 코드
  value: string;  //코드그룹명, 코드값
  dummy1: string;
  dummy2: string;
  dummy3: string;
  dummy4: string;
  dummy5: string;
}

interface BaseProgram {
  id: number;
  depth: number;
  programCode: string;
  programName: string;
  applicationCode: string;
  parentProgramCode: string;
  description?: string;
  programIndex?: number;
  path?: string;
  href?: string;
  icon?: string;
  parentId: Program["id"] | null;
  isActive: boolean;
  children?: BaseProgram[];
}

interface System extends Omit<BaseProgram, "parentId"> {
  parentId?: Program["id"] | null;
}

interface Category extends BaseProgram {
  systemName: System["programName"];
  systemCode: System["programCode"];
}

interface Program extends BaseProgram {
  systemName: System["programName"];
  systemCode: System["programCode"];
  categoryName: Category["programName"];
  categoryCode: Category["programCode"];
}

interface ProgramMapping {
  id: number; // programId
  programMappingId?: number;
  programCode: string;
  programName: string;
  description?: string;
  isAccessible: boolean;
  isReadonly: boolean;
  roleCode: Role["roleCode"];
  systemName: System["programName"];
  categoryName: Category["programName"];
}

interface FetchOptions {
  isSearched?: boolean;
  isPaginated?: boolean;
  hasSelected?: boolean;
  isInitData?: boolean;
  pageParams?: Partial<PageParams>;
}

export type { User, Role, BaseProgram, System, Category, Program, ProgramMapping, FetchOptions, Code };
