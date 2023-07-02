import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { api } from "~/utils/api";

export const ShowCard: React.FC = () => {
  const { data: sessionData } = useSession();

  //TODO: Actually want the user's settings "default" deck, not just "findFirst". When do we change this to the "currentDeck"?
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
    <div className="flex flex-col items-center gap-12">
      <h3 className="font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2.5rem]">
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
  );
};
