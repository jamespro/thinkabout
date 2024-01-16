import { useSession } from "next-auth/react";
import { UserPrefs } from "~/components/UserPrefs";
import { api } from "~/utils/api";
import Link from "next/link";

//TODO: map!! are you getting the data from props, or is it already here? or ctx?
export const DebugInfo: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: getPref } = api.pref.getPref.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-purple-800 p-2 sm:text-[0.5rem]">
      <p className="text-primary-content sm:text-[1.25rem]">DEBUG INFO</p>

      {sessionData && !getPref && <p>YOU NEED PREFS</p>}
      {sessionData && getPref && (
        <div className="text-white">
          <p className="text-white">YOU HAVE PREFS</p>
          <div>{getPref.currentDeck}</div>
        </div>
      )}
      {sessionData && <UserPrefs />}
    </div>
  );
};
