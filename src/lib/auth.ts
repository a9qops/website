/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const SECRET_KEY = process.env.JWT_SECRET;
const key = new TextEncoder().encode(SECRET_KEY);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
  const session = await encrypt({ userId, expires });

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function requireAuth() {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }
  return session;
}
