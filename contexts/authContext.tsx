import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || null,
          email: firebaseUser.email || null,
          image: firebaseUser.photoURL || null,
        });
        router.replace("/(tabs)" as any);
      } else {
        setUser(null);
        router.replace("/(auth)/welco me" as any);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
      };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Wrong Credentials";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email";
      }
      return {
        success: false,
        msg,
      };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsRegistering(true);
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
      });
      return {
        success: true,
      };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "This email is already in use";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email";
      }
      return {
        success: false,
        msg,
      };
    } finally {
      setIsRegistering(false);
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          name: data.name || null,
          email: data.email || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      console.log("error: ", error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
    isRegistering,
    isLoggingIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
