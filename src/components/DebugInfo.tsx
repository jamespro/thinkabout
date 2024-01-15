import { useSession } from "next-auth/react";
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
    <div className="flex flex-col items-center justify-center gap-4 bg-purple-800">
      <h3 className="tracking-tight text-[hsl(195,100%,75%)] sm:text-[2.5rem]">
        Debug Info
      </h3>

      {sessionData && !getPref && <h1>YOU NEED PREFS</h1>}
      {sessionData && getPref && (
        <div className="text-white">
          <h1 className="text-white">YOU HAVE PREFS</h1>
          <div>{getPref.currentDeck}</div>
        </div>
      )}
    </div>
  );
};
