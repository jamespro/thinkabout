import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "!" });

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">thinkabout</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "One sec..."}
            </p>
            <AuthShowcase />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="./dashboard"
            >
              <h3 className="text-2xl font-bold">What is this?</h3>
              <div className="text-lg">
                <p>
                  Get messages inspiring your creativity, your productivity, or
                  just reminders to stretch-- it&lsquo;s all up to you!
                </p>
                <p>
                  (There will be a demo here, but right now this takes you to
                  your main page.)
                </p>
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="./dashboard"
            >
              <h3 className="text-2xl font-bold">How does it work?</h3>
              <div className="text-lg">
                <p>Log in, then manage your own Categories and Cards.</p>
                <p>
                  (An FAQ will be here, but right now this takes you to your
                  main page.)
                </p>
              </div>
            </Link>
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

  const { data: defaultNote } = api.note.getOne.useQuery({
    topicId: defaultTopic?.id || "",
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && (
          <span>You&lsquo;re logged in as {sessionData.user?.name}</span>
        )}
        {secretMessage && <span> - {secretMessage}</span>}
        {defaultNote && <span>{defaultNote.title}</span>}
      </p>
      {sessionData && (
        <div className="flex flex-col items-center justify-center gap-4">
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard">Go to your Dashboard →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/manage">Manage Cards →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view">View Cards →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view/random">Show me a Card →</Link>
          </button>
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            <Link href="dashboard/view/play">Play my default Category →</Link>
          </button>
        </div>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
