import { fetcher } from "@/services/fetch";

export const PublicService = {
  getSystemAccess: async (data: any) => {
    return fetcher({
      url: "/public/systems/access",
      body: JSON.stringify(data),
    });
  },
  getCodes: async (systemId: string) => {
    const params = { systemId };
    return fetcher({
      url: "/public/codes",
      params,
    });
  },
  getCodeGroups: async (systemId: string) => {
    const params = { systemId };
    return fetcher({
      url: "/public/codes/group",
      params,
    });
  },
  getPrograms: async (systemId: string) => {
    const params = { systemId };
    return fetcher({
      url: "/public/user-programs",
      params,
    });
  },
  getMenus: async (systemId: string) => {
    const params = { systemId };
    return fetcher({
      url: "/public/user-menus",
      params,
    });
  },
  getUsers: async (systemId: string) => {
    const params = { systemId };
    return fetcher({
      url: "/public/users",
      params,
    });
  },
};
