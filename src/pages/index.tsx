import { useState } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { api, type RouterOutputs } from "~/utils/api";
import { Header } from "~/components/Header";
import { NoteEditor } from "~/components/NoteEditor";
import { NoteCard } from "~/components/NoteCard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ThinkAbout</title>
        <meta
          name="description"
          content="ThinkAbout: Be prompted with ideas to consider"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
};

export default Home;

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
        // maybe should update the contents of the right side of the page also? Or does that get triggered when this is updated?
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
      //TODO: and after you create a new one, it should change the content part of the page to be that Topic (header, no notes yet, with form)
    },
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
        {selectedTopic && (
          <div className="flex flex-1">
            <div>
              <span className="text-3xl">{selectedTopic.title}</span>
            </div>
            {!notes?.length && (
              <div
                className="ml-20 text-right text-sm text-red-600"
                onClick={() =>
                  void deleteTopic.mutate({ id: selectedTopic.id })
                }
              >
                ❌
              </div>
            )}
          </div>
        )}

        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
          ))}
        </div>

        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              topicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};
