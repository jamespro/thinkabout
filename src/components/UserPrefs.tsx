import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";

//TODO: map!! are you getting the data from props, or is it already here? or ctx?
export const UserPrefs: React.FC = () => {
  const { data: sessionData } = useSession();
  //NOTE: check for prefs. If no prefs, create default prefs. (I was able to put the creation into the tPRC procedure)

  const { data: pref } = api.pref.getPref.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && (
        <p className="text-center text-2xl text-white">
          <span>You&lsquo;re logged in as {sessionData.user?.name}</span>
        </p>
      )}
      {sessionData && pref && (
        <div>
          <p className="text-center text-white">Your prefs include:</p>
          <p className="text-center text-white">
            defaultDeck: {pref.defaultDeck || `set this up`}
          </p>
          <p className="text-center text-white">
            currentDeck: {pref.currentDeck || `set this up`}
          </p>
        </div>
      )}
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        <Link href="dashboard">Go to your Dashboard →</Link>
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in to make your own!"}
      </button>
    </div>
  );
};
