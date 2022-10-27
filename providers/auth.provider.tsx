import LoaderComponent from "@/common/loader.component";
import { gql, useQuery } from "@apollo/client";
import { Role, User } from "@prisma/client";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";

interface IAuthContext {
  user: User | null;
  role: Role | null;
  logout: () => void;
  refetchUser: () => void;
}

interface IAuthProvider {
  children?: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  role: null,
  logout: () => {},
  refetchUser: () => {},
});

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      roleId
      is_active
    }

    currentRole {
      id
      rol_name
    }
  }
`;

const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const { data, loading, refetch: refetchUser } = useQuery(GET_CURRENT_USER);

  const logout = useCallback(() => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (token != null && data?.currentUser) {
      setUser(data.currentUser);
      setRole(data.currentRole);
    }
  }, [data, loading]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          role,
          logout,
          refetchUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
