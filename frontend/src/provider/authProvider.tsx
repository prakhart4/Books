import axios from "axios";
import React, {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

type user = {
  email: string;
  name: string;
  token: string;
};

interface IWrapper {
  currentUser?: user;
  logOut: (callback: () => void) => Promise<void>;
  signInEmailPassword: (email: string, password: string) => Promise<string>;
  signUpEmailPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<string>;
}

const AuthContext = createContext<IWrapper | null>(null);

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [token, setToken] = useState("");

  const auth = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  //sign in with email and password
  async function signInEmailPassword(email: string, password: string) {
    try {
      const response = await auth.post("user/signIn", { email, password });
      setToken(response.data.token);
      setCurrentUser(response.data.user);

      return "User logged in successfully";
    } catch (error: any) {
      console.log(`Failed to log in! ${error}.`);
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
      const response = await auth.post("user/signUp", {
        email,
        password,
        name,
      });

      setToken(response.data.token);
      setCurrentUser(response.data.user);

      return "User created successfully";
    } catch (error: any) {
      console.log(`Failed to sign up! ${error}.`);
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
