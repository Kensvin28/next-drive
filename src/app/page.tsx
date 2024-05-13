import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import DirectoryList from "@/components/DirectoryList";

export default async function HomePage() {
  // Get user session token
  const session = await getServerSession(authOptions);
  // session = null || { user: { name, email, image } }

  return (
    <main className="flex min-h-screen flex-col items-start justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-start justify-start gap-12 px-8 py-8">
        {session && (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
              Welcome {session?.user?.name}
            </h1>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <DirectoryList url={`${process.env.NEXTAUTH_URL}/api/downloadAll`} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
