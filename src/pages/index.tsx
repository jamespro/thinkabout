import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { GlobalHeader } from "~/components/GlobalHeader";
import { ObliqueCard } from "../components/ObliqueCard";
import { ShowCard } from "~/components/ShowCard";
import { AboutContent } from "../components/AboutContent";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "!" });

  //NOTE: For the default card, this way kinda worked, until I made it into a component:
  // function getRandomOblique(oblique: string[]): string {
  //   const randomIndex = Math.floor(Math.random() * oblique.length);
  //   return oblique[randomIndex] || "Try again";
  // }

  // function draw() {
  //   setCard(getRandomOblique(oblique));
  // }

  // const [card, setCard] = useState<string>(() => getRandomOblique(oblique));

  return (
    <>
      <Head>
        <title>thinkabout!</title>
        <meta
          name="description"
          content="thinkabout: Think like you've never thunk before"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalHeader headerText={"thinkabout"} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-12">
            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "One sec..."}
            </p> */}
            <AuthShowcase />
            <AboutContent />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!sessionData && <ObliqueCard />}
      {sessionData && !defaultNote && (
        <>
          <ObliqueCard />
          <h1 className="text-white">Create your own custom cards!</h1>
        </>
      )}
      {sessionData && defaultNote && <ShowCard />}
      {secretMessage && <span> - {secretMessage}</span>}
      {sessionData && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            <span>You&lsquo;re logged in as {sessionData.user?.name}</span>
          </p>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard">Go to your Dashboard →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/manage">Manage Decks →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view">View Cards →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view/random">Show me a Card →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view/play">Play my default Deck →</Link>
          </button>
        </div>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in to make your own!"}
      </button>
    </div>
  );
};
