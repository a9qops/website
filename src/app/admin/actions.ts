/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, clearSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      return { error: 'Invalid email or password.' };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Invalid email or password.' };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { error: 'Invalid email or password.' };
    }

    await createSession(user.id);
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}

export async function logout() {
  await clearSession();
  revalidatePath('/admin');
}
