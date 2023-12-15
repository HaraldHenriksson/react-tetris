import Messages from "@/components/Messages";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-customBlue py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-white mb-4">
            Welcome to React Tetris
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="/auth/sign-in" method="post">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                //required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                //required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <Link
                href="/forgot-password" // link to forgot password link
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
            <div className="text-sm">
              <Link
                href="/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <Messages />
        </form>
      </div>
    </div>
  );
}
