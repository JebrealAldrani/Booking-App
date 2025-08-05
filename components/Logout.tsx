"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { destroySession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

const LogoutButton = () => {
  const router = useRouter();

  const { setIsAuthenticated } = useAuth();
  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false)
      router.push("/login");
    }

    if (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="mx-3 text-gray-800 hover:text-gray-600"
      >
        <FaSignOutAlt className="inline mr-1" /> Sign Out
      </button>
    </>
  );
};

export default LogoutButton;
