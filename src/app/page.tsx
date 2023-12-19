import Home from "./(signedin)/page";
import SignIn from "./(signedout)/sign-in/page";
import { getServerUser } from "./lib/user/server";

export const dynamic = "force-dynamic";

export default async function Index() {
  const user = await getServerUser();

  console.log("user", user?.email);

  return <div>{user && user?.id ? <Home /> : <SignIn />}</div>;
}
