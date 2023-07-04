import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "~/utils/api";
import { DashboardHeader } from "~/components/DashboardHeader";
import { CardEditor } from "~/components/CardEditor";
import { CardCard } from "~/components/CardCard";

const Manage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manage Your Decks</title>
        <meta
          name="description"
          content="Decks: Create, Read, Update, Delete"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader headerText={"Manage Your Decks"} />
      <main>
        <Content />
      </main>
    </>
  );
};

export default Manage;

type Deck = RouterOutputs["deck"]["getAllDecks"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const { data: decks, refetch: refetchDecks } = api.deck.getAllDecks.useQuery<
    Deck[]
  >(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data: Deck[] | undefined) => {
      setSelectedDeck(selectedDeck ?? data?.[0] ?? null);
    },
  });

  const createDeck = api.deck.create.useMutation({
    onSuccess: () => {
      void refetchDecks();
    },
  });

  const deleteDeck = api.deck.delete.useMutation({
    onSuccess: () => {
      void refetchDecks();
    },
  });

  const { data: cards, refetch: refetchCards } = api.card.getAll.useQuery(
    {
      deckId: selectedDeck?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedDeck !== null,
    }
  );

  const createCard = api.card.create.useMutation({
    onSuccess: () => {
      void refetchCards();
    },
  });

  const deleteCard = api.card.delete.useMutation({
    onSuccess: () => {
      void refetchCards();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
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
                {deck.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="Add New Deck"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createDeck.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
        {selectedDeck && (
          <div className="flex flex-1">
            <div>
              <span className="text-3xl">{selectedDeck.title}</span>
            </div>
            {!cards?.length && (
              <div
                className="ml-20 text-right text-sm text-red-600"
                onClick={() => {
                  void deleteDeck.mutate({ id: selectedDeck.id });
                  //I think this worked to reset the content of the page after you delete
                  setSelectedDeck(null);
                }}
              >
                ❌
              </div>
            )}
          </div>
        )}

        <div>
          {cards?.map((card) => (
            <div key={card.id} className="mt-5">
              <CardCard
                card={card}
                onDelete={() => void deleteCard.mutate({ id: card.id })}
              />
            </div>
          ))}
        </div>

        <CardEditor
          // NOTE: Should I just change createCard to do an "upsert" so I can use it for update also?
          onSave={({ title, content }) => {
            void createCard.mutate({
              title,
              content,
              deckId: selectedDeck?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};
