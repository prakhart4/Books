import axios, { AxiosInstance } from "axios";
import React, {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

export interface user {
  id: string;
  name?: string | null;
  email: string;
  password: string;
  credit: number;
  ownedBooks: string[];
}

interface IWrapper {
  currentUser?: user;
  logOut: (callback: () => void) => Promise<void>;
  signInEmailPassword: (email: string, password: string) => Promise<string>;
  signUpEmailPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<string>;
  api: AxiosInstance;
}

const AuthContext = createContext<IWrapper | null>(null);

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [token, setToken] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  // Add a request interceptor
  api.interceptors.request.use((config) => {
    if (token === "") {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  //sign in with email and password
  async function signInEmailPassword(email: string, password: string) {
    try {
      const response = await api.post("user/signIn", { email, password });
      setToken(response.data.token);
      setCurrentUser(response.data.user);

      return "User logged in successfully";
    } catch (error: any) {
      console.error(error);
      alert(`Failed to log in! ${error.response.data.message}.`);
      throw error.response.data;
    }
  }

  //sign Up with email and password
  async function signUpEmailPassword(
    email: string,
    password: string,
    name: string
  ) {
    try {
      const response = await api.post("user/signUp", {
        email,
        password,
        name,
      });

      setToken(response.data.token);
      setCurrentUser(response.data.user);

      return "User created successfully";
    } catch (error: any) {
      console.error(error);

      alert(`Failed to sign up! ${error.response.data.message}.`);
      throw error.response.data;
    }
  }

  //Log out
  async function logOut(callback: () => void) {
    // Log out the currently active user
    try {
      //   await auth.post("user/logout", { token });
      setToken("");
      console.log("Logged out");
      setCurrentUser(undefined);
      callback();
    } catch (err: any) {
      alert(`Failed Logout! ${err?.error}.`);
      console.log(`Failed Logout! ${err.message}.`);
    }
  }

  const wrapped = {
    currentUser,
    signUpEmailPassword,
    signInEmailPassword,
    logOut,
    api,
  };

  return (
    <AuthContext.Provider value={wrapped}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authProvider = useContext(AuthContext);
  if (!authProvider) {
    throw new Error(`You must call useAuth() inside of a <AuthProvider />`);
  }
  return authProvider;
};
