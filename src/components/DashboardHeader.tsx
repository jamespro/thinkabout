import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface ChildComponentProps {
  headerText?: string;
}
export const DashboardHeader: React.FC<ChildComponentProps> = ({
  headerText,
}) => {
  const { data: sessionData } = useSession();

  return (
    <header>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1 pl-5 text-3xl font-bold">
          <Link href="/">thinkabout</Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <div className="flex items-center">
              {sessionData?.user ? (
                <button
                  className="btn-ghost rounded-btn btn mr-4"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              ) : (
                <div></div>
              )}
              <div className="mr-2 font-bold">
                {/* TODO: Make this link to your main page, with nothing selected--or profile/settings page */}
                <Link href="/dashboard">
                  {sessionData?.user?.name ? `${sessionData.user.name}` : ""}
                </Link>
              </div>
              {sessionData?.user ? (
                <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                  <div className="w-10 rounded-full">
                    {/* TODO: Make this link to your main page, with nothing selected--or profile/settings page */}
                    <Link href="/dashboard">
                      <img
                        src={sessionData?.user?.image ?? ""}
                        alt={sessionData?.user?.name ?? ""}
                      />
                    </Link>
                  </div>
                </label>
              ) : (
                <button
                  className="btn-ghost rounded-btn btn"
                  onClick={() => void signIn()}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1 className="m-6 text-4xl font-bold">{headerText}</h1>
    </header>
  );
};
