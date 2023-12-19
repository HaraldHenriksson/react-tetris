"use server";

import Messages from "@/components/Messages";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

interface PageProps {
  searchParams: SearchParams;
}

export default async function ResetPassword({ searchParams }: PageProps) {
  console.log("hello");
  return (
    <div className="min-h-screen flex items-center justify-center bg-customBlue py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h1>
        </div>
        <form
          className="mt-8 space-y-6"
          action="/auth/reset-password"
          method="post"
        >
          <input type="hidden" name="token" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="New password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </div>
          <Messages />
        </form>
      </div>
    </div>
  );
}
