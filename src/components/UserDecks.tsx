import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";

//TODO: map!! are you getting the data from props, or is it already here? or ctx?
export const UserDecks: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: allDecks } = api.deck.getAllDecks.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const updateCurrentDeck = api.pref.updateCurrentDeck.useMutation({});

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="tracking-tight text-[hsl(105,100%,75%)] sm:text-[2.5rem]">
        Your Decks
      </h3>
      {sessionData && allDecks && (
        <div className="flex flex-col items-center justify-center gap-4">
          {/* <div className="text-white">
            note: when you click one of the decks, 
            A) change your "current Deck" 
            B) change user pref setting currentDeck needs to be updated. Also
            C) the quote should change
            IS THIS ALL THE SAME THING? one triggers the other?
            - update "deck" in State
            - triggers new draw
            - triggers update pref?
            or similarly
            - update "deck" in pref
            - triggers update "deck" in State
            - triggers new card draw
            <br>
            todo: Make the defaultCard pull from the user currentDeck
            <br>
            Should I be putting the deck State.... index/top-level? ... or ShowCard and have Change Deck buttons below?
            ... Context??
          </div> */}
          {allDecks.map((item) => (
            <button
              key={item.id}
              title={item.id}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => {
                void updateCurrentDeck.mutate({ currentDeck: item.id });
              }}
            >
              Switch to {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
