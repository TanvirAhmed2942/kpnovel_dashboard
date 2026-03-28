const USER_ROLE_KEY = "userRole";

/** Matches `AppSidebar`: `author` | `admin` | `super-admin` */
export type StoredUserRole = "author" | "admin" | "super-admin";

export function getStoredUserRole(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem(USER_ROLE_KEY) ?? localStorage.getItem(USER_ROLE_KEY)
  );
}

export function setStoredUserRole(role: StoredUserRole, remember: boolean) {
  if (remember) {
    localStorage.setItem(USER_ROLE_KEY, role);
    sessionStorage.removeItem(USER_ROLE_KEY);
  } else {
    sessionStorage.setItem(USER_ROLE_KEY, role);
    localStorage.removeItem(USER_ROLE_KEY);
  }
}

export function clearStoredUserRole() {
  localStorage.removeItem(USER_ROLE_KEY);
  sessionStorage.removeItem(USER_ROLE_KEY);
}

/** Fallback when storage is empty (e.g. SSR) so nav matches the URL. */
export function inferRoleFromPathname(pathname: string): StoredUserRole | null {
  if (pathname.startsWith("/author")) return "author";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/super_admin")) return "super-admin";
  return null;
}
