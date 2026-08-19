 
'use client';

import { useActionState, useEffect } from 'react';
import { login } from '../actions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/admin');
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 px-6 sm:px-0">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">
          <span>Nine</span><br />
          <span className="text-amber-500">Admin</span>
        </h2>
        <div className="w-16 h-1 bg-amber-500 rounded-full mt-6 mb-8"></div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-6 sm:px-0">
        <form className="space-y-6" action={formAction}>
          <div className="space-y-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
            />
          </div>

          {state?.error && (
            <div className="text-sm text-red-500 mt-2 font-medium">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 mt-8 hover:bg-amber-400 rounded disabled:opacity-50 flex items-center justify-center gap-3 transition-colors"
          >
            {isPending && <Loader2 className="animate-spin h-5 w-5" />}
            {isPending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
