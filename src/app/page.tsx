import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { auth, signIn, signOut } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getThemeToggler } from "@/lib/theme/get-theme-button";
import { GithubIcon, ExternalLink, Wrench } from "lucide-react";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  const userCount = await db
    ?.select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(users);

  const SetThemeButton = getThemeToggler();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl text-start w-full mt-16">
        <h1 className="text-3xl font-bold mb-4">Welcome to Exporto</h1>
        <p className="mb-6">
          A full stack app built using production-ready tools and frameworks,
          hosted on Cloudflare instantly.
        </p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wrench className="mr-2 h-5 w-5" />
            Try Our Tools
          </h2>
          <p className="mb-4">
            We have added a collection of useful online tools to help with
            everyday tasks. Check out our free online tools - no ads, no
            registration required.
          </p>
          <Button asChild>
            <Link href="/tools" className="flex items-center">
              Explore Tools
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Here is what the stack includes:
        </h2>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>
            Authentication with{" "}
            <code className="bg-muted px-1 py-0.5 rounded">next-auth</code>
          </li>
          <li>Database using Cloudflare D1 serverless databases</li>
          <li>Drizzle ORM, already connected to your database and auth ⚡</li>
          <li>Light/darkmode theming that works with server components</li>
          <li>Styling using TailwindCSS and ShadcnUI</li>
          <li>Cloudflare wrangler for quick functions on the edge</li>
        </ul>

        <div className="border p-4 rounded-lg bg-muted/20">
          <p className="mb-2">
            Number of users in database: {userCount?.[0]!.count}
          </p>

          {session?.user?.email ? (
            <div>
              <p>Hello {session.user.name} 👋</p>
              <p className="text-sm text-muted-foreground mb-4">
                {session.user.email}
              </p>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button>Sign out</Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <Button>Login with Google</Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button>
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Login with GitHub
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
