import AuthForm from '@/app/components/auth/AuthForm';
import { login } from '@/app/actions/auth.actions';

// Set dynamic segment options for Next.js App Router
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <AuthForm
      formAction={login} // Pass the server action for logging in
      isLogin={true}
    />
  );
}