//temporarily here and we will move it later
//view cards of a deck
import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "~/utils/api";
import { DashboardHeader } from "~/components/DashboardHeader";
// import { CardCard } from "~/components/CardCard";

const ViewDecksPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>View Your Cards</title>
        <meta name="description" content="Cards: View" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader headerText={"View Your Cards"} />
      <main>
        <Content />
      </main>
    </>
  );
};

export default ViewDecksPage;

type Deck = RouterOutputs["deck"]["getAllDecks"][0];
// type Card = RouterOutputs["card"]["getAll"][0];

// const something = () => {
//   return (
//     <>
//       <div>List of Decks</div>
//       <ul>
//         <li>
//           Deck title{" "}
//           <ul>
//             <li>
//               Button/Icon: show one card (pick one card): it will show on this
//               screen on the right in the body of the page
//             </li>
//             <li>
//               Button/Icon: auto-play this deck (pick one card then it refreshes
//               every 21 minutes) This will also show on this page, on the right
//             </li>
//           </ul>{" "}
//         </li>
//       </ul>
//     </>
//   );
// };

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  // const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const { data: decks } = api.deck.getAllDecks.useQuery<Deck[]>(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data: Deck[] | undefined) => {
      setSelectedDeck(selectedDeck ?? data?.[0] ?? null);
    },
  });

  const { data: cards } = api.card.getAll.useQuery(
    {
      deckId: selectedDeck?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedDeck !== null,
    }
  );
  const { data: cardCount } = api.card.getCount.useQuery(
    {
      deckId: selectedDeck?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedDeck !== null,
    }
  );

  const randomCardIndex = Math.floor(Math.random() * (cardCount || 0));
  // NOTE: should I set the state default note here, before rendering?

  return (
    <div className="mx-5 mt-5 grid grid-cols-5 gap-2">
      <div className="col-span-2 px-2">
        <div>
          <h3>Decks</h3>
        </div>

        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {decks?.map((deck) => (
            <li key={deck.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedDeck(deck);
                }}
              >
                {deck.title} (Show One Card) (Play All)
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
      </div>
      <div className="col-span-3">
        {selectedDeck && (
          <div className="flex flex-1">
            <div>
              <span className="text-3xl italic">{selectedDeck.title}</span>
            </div>
          </div>
        )}

        <div>
          {/* <div>
            No list below here. Just show the one specific card that was picked
            from the left side. Use NoteCard. Which card though? How will you
            select it? Step 1: findFirst. Step 2: GetAll cards in the array,
            UNLESS ANOTHER WAY TO KNOW HOW MANY THERE ARE FOR THIS DECK? Select
            random by getting the total qty of cards, then picking a random
            number between 0 and index-1 and selecting that card?? YEah just
            them all, since you could also just do the same thing if you are
            cycling through all of them for `PLAY ALL`
            I could keep the entire list of notes, and make them all hidden, and
            un-hide the one that I want...
            generate random number (between what and what) map note only keep if
            note index = the random number I got
          </div> */}
          {/* <div>randomNoteIndex: {randomNoteIndex} </div> */}
          {/* Next: Get a link in the left column to trigger showing this one random card in the right column. */}
          <p className="text-gray-400">
            There are {cardCount} Cards in this Deck. Here is one of them:
          </p>
          {cards?.map((card, index) => {
            if (index == randomCardIndex)
              return (
                <div key={card.id} className="mt-5 text-2xl">
                  {card.title}
                </div>
              );
          })}
          {/* {cards?.map((card) => (
            <div key={card.id} className="mt-5">
              {card.title}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
