import { signIn, signOut, useSession } from "next-auth/react";

interface ChildComponentProps {
  headerText?: string;
}

export const Header: React.FC<ChildComponentProps> = ({ headerText }) => {
  const { data: sessionData } = useSession();

  return (
    <header>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1 pl-5 text-3xl font-bold">
          {sessionData?.user?.name ? `${sessionData.user.name}` : ""}
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            {sessionData?.user ? (
              <label
                tabIndex={0}
                className="btn-ghost btn-circle avatar btn"
                onClick={() => void signOut()}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={sessionData?.user?.image ?? ""}
                    alt={sessionData?.user?.name ?? ""}
                  />
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
      <h1 className="m-6 text-4xl font-bold">{headerText}</h1>
    </header>
  );
};
