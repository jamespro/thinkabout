import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { api } from "~/utils/api";

export const ShowCard: React.FC = () => {
  const { data: sessionData } = useSession();

  //TODO: Actually want the user's settings "default" deck, not just "findFirst". When do we change this to the "currentDeck"?
  // const { data: defaultDeckId } = api.deck.getDefaultDeckId.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  // const { data: defaultDeckData } = api.deck.getDeckData.useQuery(
  //   {
  //     deckId: defaultDeckId.id || "",
  //   },
  //   { enabled: defaultDeckId.id !== undefined }
  // );

  const { data: allDecks } = api.deck.getAllDecks.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: defaultDeck } = api.deck.getDefaultDeck.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  //NOTE: Not currently using "getOne" because getting all and picking one
  // const { data: defaultCard } = api.card.getOne.useQuery(
  //   {
  //     deckId: defaultDeck?.id || "",
  //   },
  //   { enabled: sessionData?.user !== undefined }
  // );

  //NOTE: Only need text string? Need id? Need deck id? Need deck displayName? Start with just text string like sample data. Is that a different query? Or just refine it after getting? Or I just change where it is deconstructed?

  const { data: cardsData } = api.card.getAll.useQuery(
    {
      deckId: defaultDeck?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  const [card, setCard] = useState<string>("");
  // const [deckId, setDeckId] = useState<string>(defaultDeckId);
  const [deckData, setDeckData] = useState<string[]>([]);

  useEffect(() => {
    if (cardsData) {
      const cardsTitles = cardsData.map((item) => item.title);
      setDeckData(cardsTitles);
    }
  }, [cardsData]);

  // Will want to update the state of the current deck, when click button with deck name / id

  const draw = useCallback(() => {
    const random = Math.floor(Math.random() * deckData.length);
    setCard(deckData[random] || "Try again");
  }, [deckData]);

  useEffect(() => {
    draw(); // Call draw on initial render
  }, [draw]);

  // const { data: getPref } = api.pref.getPref.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  // const updateCurrentDeck = api.pref.updateCurrentDeck.useMutation({});

  return (
    <>
      <div className="flex flex-col items-center gap-12">
        <h3 className="font-extrabold tracking-tight text-[hsl(60,100%,75%)] sm:text-[2.5rem]">
          {card}
        </h3>
        <button className="btn" onClick={draw}>
          Draw a card
        </button>
        {/* {defaultDeck && (
        <button className="btn" onClick={setDeck(defaultDeck)}>
        Update Deck
        </button>
      )} */}
      </div>
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
          {/* {allDecks.map((item) => (
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
          ))} */}
        </div>
      )}
    </>
  );
};
