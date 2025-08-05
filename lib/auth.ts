'use server'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import db from './db'
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';

//Adapter to tell lucia where and how store sessions
const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions'
});

//Lucia instance to handle authentication
const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})

//function to create session using lucia instance
export const createSession = async (userId: string) => {
    const session = await lucia.createSession(userId, {});
    const sessionCookies = lucia.createSessionCookie(session.id);
    (await cookies()).set(
        sessionCookies.name,
        sessionCookies.value,
        sessionCookies.attributes
    )
} 

//function to verify session is valid
export const verifyAuth = async () => {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
    if(!sessionCookie) {
        return {
            user: null,
            session: null
        }
    }
    const sessionId = sessionCookie.value;

    if(!sessionId) {
        return {
            user: null,
            session: null
        }
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if(result.session && result.session.fresh) {
            //create new session cookie if session is valid
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }

        if(!result.session) {
            const blankSessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                blankSessionCookie.name,
                blankSessionCookie.value,
                blankSessionCookie.attributes
            )
        }
    } catch (error) {
        console.log('error in verifying session')
    }
    
    return result
}

//function to destroy sessions
export const destroySession = async () => {
    const { session } = await verifyAuth();

    if(!session) {
        return{
            error: 'unAuthorized'
        }
    }

    //destroy session using lucia instance
    await lucia.invalidateSession(session.id)

    const blankSessionCookies = lucia.createBlankSessionCookie();
    (await cookies()).set(
        blankSessionCookies.name,
        blankSessionCookies.value,
        blankSessionCookies.attributes
    )
    return {
        success: true
    }
}
