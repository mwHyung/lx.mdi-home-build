export interface Menu {
  menuId: string;
  systemId: string;
  menuCode: string;
  menuName: string;
  depth: number;
  parentMenuId?: Menu["menuId"];
  description?: string;
  menuIndex: number;
  icon?: string;
  isActive: boolean;
  isProgram: boolean;
  programId?: string;
}
