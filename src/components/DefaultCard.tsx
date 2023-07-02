import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import deckData from "~/obliqueData.json";
import { api } from "~/utils/api";
// TODO: now make this use the user data
// NOTE: Need user data / session

export const DefaultCard: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: defaultTopic } = api.topic.getDefault.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: defaultNote } = api.note.getOne.useQuery(
    {
      topicId: defaultTopic?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  //NOTE: Only need text string? Need id? Need deck id? Need deck displayName? Start with just text string like sample data. Is that a different query? Or just refine it after getting? Or I just change where it is deconstructed?
  const { data: deckNotes } = api.note.getAll.useQuery(
    {
      topicId: defaultTopic?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );
  // const newDeckData = deckNotes?.map((item) => item.title);

  // console.log(newDeckData);

  const [card, setCard] = useState<string>("");
  const [deck, setDeck] = useState<string[]>([]);
  useEffect(() => {
    if (deckNotes) {
      const newDeckData = deckNotes.map((item) => item.title);
      setDeck(newDeckData);
    }
  }, [deckNotes]);

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
