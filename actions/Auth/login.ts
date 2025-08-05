'use server'

import { authErrors } from "@/interfaces/authErrors";
import { createSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/hash";
import { getUserByEmail } from "@/lib/user";

const login = async (prevState: authErrors, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existedUser = await getUserByEmail(email);

  if (!existedUser) {
    return {
      error: "Incorrect email, please check your credentials" ,
    };
  }

  const ValidPassword = verifyPassword(existedUser.password, password)

  if(!ValidPassword) {
    return {
        error: 'Incorrect password, please check your credentials'
    }
  }

  await createSession(existedUser.id);
  return{ success: true }
};

export default login;
