import { useState } from 'react';

import { LoginForm, type SignInForm } from '@/components/login-form';
import { SignUpForm, type SignUpFormValues } from '@/components/register-form';
import { signIn, signUp } from '@/lib/auth-client';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  async function handleLogin(values: SignInForm) {
    try {
      await signIn.email(
        { email: values.email, password: values.password },
        {
          onSuccess: (ctx) => {
            // eslint-disable-next-line no-console
            console.log('Login successful!', ctx);
          },
        },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Login failed:', err);
    }
  }

  async function handleSignup(values: SignUpFormValues) {
    try {
      await signUp.email(
        { email: values.email, password: values.password, name: values.name },
        {
          onSuccess: (ctx) => {
            // eslint-disable-next-line no-console
            console.log('Signup successful!', ctx);
          },
        },
      );

      setMode('login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Signup failed:', err);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${mode === 'login' ? 'font-bold' : ''}`}
          onClick={() => setMode('login')}>
          Login
        </button>
        <button
          className={`px-4 py-2 ${mode === 'signup' ? 'font-bold' : ''}`}
          onClick={() => setMode('signup')}>
          Sign Up
        </button>
      </div>
      {mode === 'login' ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <SignUpForm onSubmit={handleSignup} />
      )}
    </div>
  );
}
