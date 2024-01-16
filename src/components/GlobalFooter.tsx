import { signIn, signOut, useSession } from "next-auth/react";
import { DebugInfo } from "~/components/DebugInfo";
import Link from "next/link";
// import { Children } from "react";

interface ChildComponentProps {
  footerText?: string;
}
export const GlobalFooter: React.FC<ChildComponentProps> = ({ footerText }) => {
  const { data: sessionData } = useSession();

  return (
    <footer>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1 pl-5 text-3xl font-bold">{footerText}</div>
        <div className="flex-none gap-2">
          <div className="flex items-center">
            {sessionData && <DebugInfo />}
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in to make your own!"}
            </button>
            <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              <Link href="dashboard">Go to your Dashboard →</Link>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
