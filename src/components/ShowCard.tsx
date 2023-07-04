import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { api } from "~/utils/api";

export const ShowCard: React.FC = () => {
  const { data: sessionData } = useSession();

  //TODO: Actually want the user's settings "default" deck, not just "findFirst". When do we change this to the "currentDeck"?
  // const { data: defaultDeckId } = api.topic.getDefaultDeckId.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  // const { data: defaultDeckData } = api.topic.getDeckData.useQuery(
  //   {
  //     topicId: defaultDeckId.id || "",
  //   },
  //   { enabled: defaultDeckId.id !== undefined }
  // );

  const { data: allDecks } = api.topic.getAll.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: defaultDeck } = api.topic.getDefault.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  //NOTE: Not currently using "getOne" because getting all and picking one
  // const { data: defaultCard } = api.note.getOne.useQuery(
  //   {
  //     topicId: defaultDeck?.id || "",
  //   },
  //   { enabled: sessionData?.user !== undefined }
  // );

  //NOTE: Only need text string? Need id? Need deck id? Need deck displayName? Start with just text string like sample data. Is that a different query? Or just refine it after getting? Or I just change where it is deconstructed?

  const { data: cardsData } = api.note.getAll.useQuery(
    {
      topicId: defaultDeck?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  const [card, setCard] = useState<string>("");
  // const [deckId, setDeckId] = useState<string>(defaultDeckId);
  const [deck, setDeck] = useState<string[]>([]);

  useEffect(() => {
    if (cardsData) {
      const cardsTitles = cardsData.map((item) => item.title);
      setDeck(cardsTitles);
    }
  }, [cardsData]);

  // Will want to update the state of the current deck, when click button with deck name / id

  const draw = useCallback(() => {
    const random = Math.floor(Math.random() * deck.length);
    setCard(deck[random] || "Try again");
  }, [deck]);

  useEffect(() => {
    draw(); // Call draw on initial render
  }, [draw]);

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
          {allDecks.map((item) => (
            <button
              key={item.id}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              {item.title} (ID: {item.id})
            </button>
          ))}
        </div>
      )}
    </>
  );
};
