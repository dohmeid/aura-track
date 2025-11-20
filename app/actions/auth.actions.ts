'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import {
  comparePasswords,
  createToken,
  hashPassword,
  verifyTokenServer
} from '@/lib/auth.utils'
import { loginSchema, signUpSchema } from '@/lib/validation/auth.validations'
import User from '@/lib/models/user.model'

/**
 * Type definition for the state object returned by auth server actions.
 * This state is used with useFormState hook in the client component.
 */
export type AuthState = {
  message: string
  success: boolean
  errors?: Record<string, string[]> | Record<string, string>
}

/**
 * Server action for user sign up.
 * This wraps the /api/auth/signup endpoint and provides form state management.
 *
 * @param prevState - Previous form state (from useFormState)
 * @param formData - FormData object containing email, password, confirmPassword, username, birthDate
 * @returns Updated state with message and success flag
 */
export async function signUp (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    // Validate form data using Zod
    const formValues = Object.fromEntries(formData.entries())
    const validationResult = signUpSchema.safeParse(formValues)

    if (!validationResult.success) {
      return {
        message: 'Please correct the errors below.',
        success: false,
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    // Destructure validated data
    const { email, password, username, birthDate } = validationResult.data

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }]
    })

    if (existingUser) {
      return {
        message:
          'A user with that email or username already exists. Please try another.',
        success: false,
        errors: {
          email:
            existingUser.email === email.toLowerCase()
              ? 'Email is already taken.'
              : '',
          username:
            existingUser.username === username
              ? 'Username is already taken.'
              : ''
        }
      }
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const newUser = new User({
      email: email.toLowerCase(),
      username,
      passwordHash,
      birthDate: new Date(birthDate)
    })
    await newUser.save()

    return {
      message: 'Account created successfully! Redirecting...',
      success: true
    }
  } catch (error) {
    console.error('SIGNUP_ACTION_ERROR:', error)
    // Handle potential database errors (like unique index violations)
    if (error && (error as any).code === 11000) {
      return {
        message: 'A user with that email or username already exists.',
        success: false
      }
    }
    return {
      message: 'An error occurred during sign up. Please try again.',
      success: false
    }
  }
}

/**
 * Server action for user login.
 * This wraps the /api/auth/login endpoint and provides form state management.
 *
 * @param prevState - Previous form state (from useFormState)
 * @param formData - FormData object containing email and password
 * @returns Updated state with message and success flag
 */
export async function login (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    // Validate form data using Zod
    const formValues = Object.fromEntries(formData.entries())
    const validationResult = loginSchema.safeParse(formValues)

    if (!validationResult.success) {
      return {
        message: 'Please correct the errors below.',
        success: false,
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    // Destructure validated data
    const { email, password } = validationResult.data

    await connectDB()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+passwordHash'
    )
    if (!user) {
      return {
        message: 'Invalid email or password.',
        success: false,
        errors: { form: 'Invalid credentials' }
      }
    }

    // Compare password
    const isMatch = await comparePasswords(password, user.passwordHash)
    if (!isMatch) {
      return {
        message: 'Invalid email or password.',
        success: false,
        errors: { form: 'Invalid credentials' }
      }
    }

    // Create JWT token
    //const token = createToken({ userId: user._id.toString() })
    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    })

    // Set cookie
    ;(
      await // Set cookie
      cookies()
    ).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    // On successful login, we can trigger a redirect directly from the server action
    // However, to give the user feedback, we'll return a success state and let the client redirect.
    // If you wanted to redirect immediately, you would uncomment the next line:
    // redirect('/dashboard');
    return {
      message: 'Login successful! Redirecting...',
      success: true
    }
  } catch (error) {
    console.error('LOGIN_ACTION_ERROR:', error)
    return {
      message: 'An error occurred during login. Please try again.',
      success: false
    }
  }
}

/**
 * Server action for user logout.
 * Deletes the session cookie.
 */
export async function logout (): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  redirect('/login')
}

/**
 * Server action to get the currently logged-in user from the httpOnly token.
 * This reads the secure cookie, verifies the token, and returns user data.
 *
 * Can be called from Server Components or Client Components.
 * @returns User object with userId, email, and username, or null if not authenticated
 */
export async function getCurrentUser () {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    // Verify token using the standard verifyToken function
    const decoded = await verifyTokenServer(token)

    if (!decoded) {
      return null
    }

    return {
      userId: decoded.userId as string,
      email: decoded.email as string,
      username: decoded.username as string
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}
