import Button from "@/components/Button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import Image from "next/image";
import UploadWrapper from "./UploadWrapper";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-2xl font-bold flex items-center">Next Drive</h1>
      <UploadWrapper session={session}/>
      <div className="flex justify-end gap-4">
        {session ? (
          <Button variant="btn-outline">
            <a href="/api/auth/signout">Sign out</a>
          </Button>
        ) : (
          <Button variant="btn-primary">
            <a href="/api/auth/signin">Sign in</a>
          </Button>
        )}
        <Image
          alt="user"
          src={session?.user?.image ?? ""}
          width={50}
          height={50}
          className={`rounded-full ${session?.user?.image ? "" : "hidden"}`}
        />
      </div>
    </header>
  );
}
