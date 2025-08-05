'use server'

import isValidEmail from "@/validations/isValidEmail";
import { authErrors } from '@/interfaces/authErrors'
import isValidPassword from "@/validations/isValidPassword";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { createSession } from "@/lib/auth";


const signUp = async (prevState: authErrors, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confPassword = formData.get('confirm-password') as string;
    const name = formData.get('name') as string;

    if(!email || !password || !name || !confPassword) {
        return {
            error: 'Please fill all fields'
        }
    }

    if(!isValidEmail(email)) {
        return {error: 'Please enter a valid email'}
    }

    if(!isValidPassword(password)) {
        return {error : 'Password should be more than 8 characters'}
    }

    if(password !== confPassword) {
        return {
            error: 'Confirm password and password do not match'
        }
    }

    const hashedPassword = hashUserPassword(password);
    try {
        const id = await createUser(email, hashedPassword, name)
        await createSession(id);
        return {
            success: true
        }
    } catch (error: any) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        error: "Email already exist!. please change the email"
      };
    }

    throw error;
    }
}

export default signUp