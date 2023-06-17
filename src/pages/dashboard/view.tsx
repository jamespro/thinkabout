//temporarily here and we will move it later
//view notes of a topic
import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "~/utils/api";
import { DashboardHeader } from "~/components/DashboardHeader";
import { NoteEditor } from "~/components/NoteEditor";
import { NoteCard } from "~/components/NoteCard";

const ViewTopicsPage: NextPage = () => {
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

export default ViewTopicsPage;

type Topic = RouterOutputs["topic"]["getAll"][0];

const something = () => {
  return (
    <>
      <div>List of Categories</div>
      <ul>
        <li>
          Category title{" "}
          <ul>
            <li>
              Button/Icon: show one card (pick one card): it will show on this
              screen on the right in the body of the page
            </li>
            <li>
              Button/Icon: auto-play this category (pick one card then it
              refreshes every 21 minutes) This will also show on this page, on
              the right
            </li>
          </ul>{" "}
        </li>
      </ul>
    </>
  );
};

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery<
    Topic[]
  >(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data: Topic[] | undefined) => {
      setSelectedTopic(selectedTopic ?? data?.[0] ?? null);
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

  return (
    <div className="mx-5 mt-5 grid grid-cols-5 gap-2">
      <div className="col-span-2 px-2">
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
                {topic.title} (Pick Card) (Play All)
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
      </div>
      <div className="col-span-3">
        {selectedTopic && (
          <div className="flex flex-1">
            <div>
              <span className="text-3xl">{selectedTopic.title}</span>
            </div>
          </div>
        )}

        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              {note.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
