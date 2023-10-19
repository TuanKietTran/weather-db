import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Buttons";

export default function SideNav() {
  const session = useSession()
  const user = session.data?.user;

  return <nav className="sticky top-0 px-2 py-4">
    <ul className="flex flex-col items-start gap-2 whitespace-normal">
      <li>
        <Link href="/">Home</Link>
      </li>
      {!!user && (
        <li>
          <Link href={`/profiles/${user.id}`}>Profile</Link>
        </li>
      )}
      <li>
        {
          !user ? <Button onClick={() => void signIn()}>Login</Button>
            : <Button onClick={() => void signOut()}>Logout</Button>
        }
      </li>
    </ul>
  </nav>
}