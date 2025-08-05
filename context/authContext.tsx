import { verifyAuth } from "@/lib/auth";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  useContext,
} from "react";

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  currentUserId: string | null;
  setCurrentUserId: Dispatch<SetStateAction<string | null>>;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentUserId: null,
  setCurrentUserId: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { user, session } = await verifyAuth();
      if (session) {
        setIsAuthenticated(true);
        setCurrentUserId(user.id);
      } else {
        setIsAuthenticated(false);
        setCurrentUserId(null);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUserId,
        setCurrentUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context
}
