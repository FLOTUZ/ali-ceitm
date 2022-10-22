import { gql, useQuery } from "@apollo/client";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  user: any;
  logout: () => void;
}

interface IAuthProvider {
  children?: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => {},
});

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      roleId
      is_active
    }
  }
`;

const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const { data, loading } = useQuery(GET_CURRENT_USER);

  const logout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      router.push("/auth/login");
    }

    if (data) {
      setUser(data.currentUser);
    }
  }, [data, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
