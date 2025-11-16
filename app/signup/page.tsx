import AuthForm from '@/app/components/auth/AuthForm';
import { signUp } from '@/app/actions/auth.actions';

// Set dynamic segment options for Next.js App Router
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default function SignupPage() {
  return (
    <AuthForm
      formAction={signUp} // Pass the server action for signing up
      isLogin={false}
    />
  );
}