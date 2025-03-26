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
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(users);

  const SetThemeButton = getThemeToggler();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex max-w-2xl justify-between w-full">
        <SetThemeButton />

        <div className="flex gap-2 items-center justify-center">
          <svg
            viewBox="0 0 256 116"
            xmlns="http://www.w3.org/2000/svg"
            width="45px"
            height="45px"
            preserveAspectRatio="xMidYMid"
            role="img"
            aria-label="Cloudflare logo"
          >
            <path
              fill="#FFF"
              d="m202.357 49.394-5.311-2.124C172.085 103.434 72.786 69.289 66.81 85.997c-.996 11.286 54.227 2.146 93.706 4.059 12.039.583 18.076 9.671 12.964 24.484l10.069.031c11.615-36.209 48.683-17.73 50.232-29.68-2.545-7.857-42.601 0-31.425-35.497Z"
            />
            <path
              fill="#F4811F"
              d="M176.332 108.348c1.593-5.31 1.062-10.622-1.593-13.809-2.656-3.187-6.374-5.31-11.154-5.842L71.17 87.634c-.531 0-1.062-.53-1.593-.53-.531-.532-.531-1.063 0-1.594.531-1.062 1.062-1.594 2.124-1.594l92.946-1.062c11.154-.53 22.839-9.56 27.087-20.182l5.312-13.809c0-.532.531-1.063 0-1.594C191.203 20.182 166.772 0 138.091 0 111.535 0 88.697 16.995 80.73 40.896c-5.311-3.718-11.684-5.843-19.12-5.31-12.747 1.061-22.838 11.683-24.432 24.43-.531 3.187 0 6.374.532 9.56C16.996 70.107 0 87.103 0 108.348c0 2.124 0 3.718.531 5.842 0 1.063 1.062 1.594 1.594 1.594h170.489c1.062 0 2.125-.53 2.125-1.594l1.593-5.842Z"
            />
            <path
              fill="#FAAD3F"
              d="M205.544 48.863h-2.656c-.531 0-1.062.53-1.593 1.062l-3.718 12.747c-1.593 5.31-1.062 10.623 1.594 13.809 2.655 3.187 6.373 5.31 11.153 5.843l19.652 1.062c.53 0 1.062.53 1.593.53.53.532.53 1.063 0 1.594-.531 1.063-1.062 1.594-2.125 1.594l-20.182 1.062c-11.154.53-22.838 9.56-27.087 20.182l-1.063 4.78c-.531.532 0 1.594 1.063 1.594h70.108c1.062 0 1.593-.531 1.593-1.593 1.062-4.25 2.124-9.03 2.124-13.81 0-27.618-22.838-50.456-50.456-50.456"
            />
          </svg>
          <span className="italic">Cloudflare Next Saas Starter</span>
        </div>

        <div className="border border-black dark:border-white rounded-2xl p-2 flex items-center">
          Start by editing apps/web/page.tsx
        </div>
      </div>

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
            Number of users in database: {userCount[0]!.count}
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
