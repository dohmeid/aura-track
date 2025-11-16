'use client';
import React, { useState, useMemo, FC, useEffect } from 'react';
import { User, Lock, Mail, Sparkles, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthState } from '@/app/actions/auth.actions';
import FormButton from './FormButton';
import FormInput from './FormInput';

interface AuthFormProps {
  formAction: (prevState: AuthState, formData: FormData) => Promise<AuthState>;
  isLogin: boolean;
}

const FormContent: FC<{ isLogin: boolean; state: AuthState; formValues: any; handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ isLogin, state, formValues, handleInputChange }) => {
  const { pending } = useFormStatus();

  const isButtonDisabled = useMemo(() => {
    if (isLogin) {
      return !formValues.email.trim() || !formValues.password;
    }
    return !formValues.email.trim() || !formValues.username.trim() || !formValues.password || !formValues.confirmPassword || !formValues.birthDate;
  }, [formValues, isLogin]);

  // Helper function to get error for a field
  const getFieldError = (fieldName: string): string | undefined => {
    if (!state.errors || typeof state.errors !== 'object') return undefined;
    const error = state.errors[fieldName];
    if (Array.isArray(error)) return error[0];
    return error as string | undefined;
  };

  return (
    <>
      <div onChange={handleInputChange}>
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="email@example.com"
          error={getFieldError('email')}
          value={formValues.email}
          onChange={handleInputChange}
        />

        {!isLogin && (
          <FormInput
            id="username"
            name="username"
            label="Username"
            icon={User}
            placeholder="Choose a username"
            error={getFieldError('username')}
            value={formValues.username}
            onChange={handleInputChange}
          />
        )}

        {!isLogin && (
          <FormInput
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            icon={Calendar}
            placeholder="Select your birth date"
            error={getFieldError('birthDate')}
            value={formValues.birthDate}
            onChange={handleInputChange}
          />
        )}

        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter your password"
          error={getFieldError('password')}
          value={formValues.password}
          onChange={handleInputChange}
        />
        
        {!isLogin && (
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            icon={Lock}
            placeholder="Confirm your password"
            error={getFieldError('confirmPassword')}
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
        )}
      </div>

      <div className="mt-8">
        <FormButton isPrimary={isLogin} isDisabled={pending || isButtonDisabled}>
          {pending ? (isLogin ? 'Logging In...' : 'Signing Up...') : (isLogin ? 'Log In' : 'Sign up')}
        </FormButton>
      </div>
    </>
  );
};


const AuthForm: FC<AuthFormProps> = ({ formAction, isLogin }) => {
  // Initial state for useFormState
  const initialState: AuthState = {
    message: '',
    success: true,
  };
  // Hook to handle form submission state and messages from Server Action
  const [state, dispatch] = useFormState(formAction, initialState);
  const [formValues, setFormValues] = useState({
    email: useSearchParams().get('email') || '',
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the redirect URL from query params, or default to '/home'
  const redirectUrl = searchParams.get('redirect_url') || `/home?success=${isLogin ? 'login' : 'signup'}`;
  const successMessage = searchParams.get('message');

  // Redirect to home after successful login/signup
  useEffect(() => {
    if (state.success && state.message && (state.message.includes('successful') || state.message.includes('Redirecting'))) {
      // Delay redirect to show the success message
      const timer = setTimeout(() => {
        router.push(redirectUrl);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, state.message, router, isLogin]);

  const title = isLogin ? 'Welcome Back.' : 'Create Your Aura.';
  const subtitle = isLogin ? 'Sign in to access your track.' : 'Join the community and track your energy.';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(circle_at_top_left,var(--blizzard-blue),var(--mint-tulip)_30%,var(--sidecar)_60%,#fff_100%)]"
    >
      <div
        className="max-w-md w-full p-8 sm:p-10 bg-white/90 backdrop-blur-sm rounded-[30px] transition-all duration-500 ease-in-out shadow-[0_15px_30px_-10px_--theme(--color-wistful/0.6),0_5px_15px_-5px_--theme(--color-chantilly/0.66)]"
      >
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-chantilly" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight font-poppins">
            {title}
          </h1>
          <p
            className="text-lg text-clam-shell" >
            {subtitle}
          </p>
        </div>

        {/* --- Server Message Display --- */}
        {(state.message || successMessage) && (
          <div
            className={`p-3 mb-6 rounded-xl flex items-center text-sm font-medium ${state.success ? 'bg-mint-tulip/30 text-green-800' : 'bg-red-100 text-red-700'}`}

          >
            {state.success ? (<CheckCircle className="w-5 h-5 mr-2 shrink-0" />) :
              (<AlertTriangle className="w-5 h-5 mr-2 shrink-0" />)}
            {state.message || successMessage}
          </div>
        )}

        {/* --- The Form --- */}
        <form action={dispatch}>
          <FormContent isLogin={isLogin} state={state} formValues={formValues} handleInputChange={handleInputChange} />
        </form>

        {/* Switch Mode Link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500 mr-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <a
            href={isLogin ? '/signup' : '/login'} // Use Next.js link/a tag for navigation
            className="text-sm font-semibold text-wistful transition-colors duration-300 transform 
            hover:text-sidecar hover:scale-105 active:scale-95"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 