import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Buttons";
import { IconHoverEffect } from "./IconHoverEffect";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-normal">
        <li>
          <Link href="/">
            <IconHoverEffect className="flex items-center gap-2">
              <HomeIcon className="h-6 w-6 text-gray-500" />
              <span className="hidden text-lg md:inline">Home</span>
            </IconHoverEffect>
          </Link>
        </li>
        {!!user && (
          <li>
            <Link href={"/edit"}>
              <IconHoverEffect className="flex items-center gap-2">
                <PencilIcon className="h-6 w-6 text-gray-500" />
                <span className="hidden text-lg md:inline">Edit</span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {!!user && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconHoverEffect className="flex items-center gap-2">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
                <span className="hidden text-lg md:inline">Profile</span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        <li>
          {!user ? (
            <Button
              onClick={() => void signIn()}
              className="flex items-center gap-2"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-500 md:hidden" />
              <span className="hidden text-lg md:inline">Sign in</span>
            </Button>
          ) : (
            <Button
              onClick={() => void signOut()}
              className="flex items-center gap-2"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-500: md:hidden" />
              <span className="hidden text-lg md:inline">Sign out</span>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
