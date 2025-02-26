type Role = "admin" | "user";

interface User {
  id: string;
  name: string;
  email: string;
  role?: Role;
  email_verified: boolean;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
}

export type { Role, User };
