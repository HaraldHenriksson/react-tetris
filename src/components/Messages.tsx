"use client";

import { useSearchParams } from "next/navigation";

type MessagesProps = {
  error?: string | null;
  message?: string | null;
};

const Messages: React.FC<MessagesProps> = () => {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const message = searchParams?.get("message");

  return (
    <>
      {error && <p className="mt-4 p-4 text-center text-white">{error}</p>}
      {message && <p className="mt-4 p-4 text-center text-white">{message}</p>}
    </>
  );
};

export default Messages;
