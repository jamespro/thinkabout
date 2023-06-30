import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

//FYI: This is for the modal.
/* 
- The TypeScript error is because TypeScript is not aware of the `my_modal_2` property on the `window` object. TypeScript thinks that the `window` object is of type `Window & typeof globalThis`, and `my_modal_2` is not a known property on that type.
- To solve this: extend the `Window` interface with custom properties. Use declaration merging. Now TypeScript knows about window.my_modal_2
- `my_modal_2` is defined as an object with a `showModal` method that returns `void`. Change it if it should return something else.
- Note: the `declare global` syntax is needed because the `Window` interface is declared in the global scope. If you don't include `declare global`, TypeScript will think you're trying to declare a new local interface, which isn't what you want.
(The ESLint warnings were because of the TypeScript error.)
*/
declare global {
  interface Window {
    my_modal_2: {
      showModal: () => void;
    };
  }
}

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
      {defaultNote && (
        <>
          <button className="btn" onClick={() => window.my_modal_2.showModal()}>
            Show me a Card
          </button>
          <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
              <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                ✕
              </button>{" "}
              {defaultTopic && <p className="py-4">{defaultTopic.title}</p>}
              <h3 className="text-lg font-bold">{defaultNote.title}</h3>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )}{" "}
      {sessionData && (
        <p className="text-center text-2xl text-white">
          <span>You&lsquo;re logged in as {sessionData.user?.name}</span>
        </p>
      )}
      {secretMessage && <span> - {secretMessage}</span>}
      {sessionData && (
        <div className="flex flex-col items-center justify-center gap-4">
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
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
