import React, { ProviderProps, ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}
const sleep = async (t = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, t);
  });
};
const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  // console.log('token',token)
  if (token) {
    await sleep(500);
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    data: user,
    setData: setUser,
    error,
    isLoading,
    isIdle,
    isError,
  } = useAsync<User | null>();

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    // run(initUser())
    initUser().then(setUser);
  });
  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
