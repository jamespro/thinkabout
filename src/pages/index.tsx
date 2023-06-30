import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { GlobalHeader } from "~/components/GlobalHeader";

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
const strategies = [
  "(Organic) machinery",
  "A line has two sides",
  "A very small object         Its center",
  "Abandon desire",
  "Abandon normal instructions",
  "Abandon normal instruments",
  "Accept advice",
  "Accretion",
  "Adding on",
  "Allow an easement (an easement is the abandonment of a stricture)",
  "Always first steps",
  "Always give yourself credit for having more than personality (given by Arto Lindsay)",
  "Are there sections?  Consider transitions",
  "Ask people to work against their better judgement",
  "Ask your body",
  "Assemble some of the elements in a group and treat the group",
  "Balance the consistency principle with the inconsistency principle",
  "Be dirty",
  "Be extravagant",
  "Be less critical",
  "Breathe more deeply",
  "Bridges\n--build\n--burn",
  "Cascades",
  "Change ambiguities to specifics",
  "Change instrument roles",
  "Change nothing and continue with immaculate consistency",
  "Change specifics to ambiguities",
  "Children\n--speaking\n--singing",
  "Cluster analysis",
  "Consider different fading systems",
  "Consider transitions",
  "Consult other sources\n--promising\n--unpromising",
  "Convert a melodic element into a rhythmic element",
  "Courage!",
  "Cut a vital connection",
  "Decorate, decorate",
  "Define an area as `safe' and use it as an anchor",
  "Destroy\n-nothing\n-the most important thing",
  "Discard an axiom",
  "Disciplined self-indulgence",
  "Disconnect from desire",
  "Discover the recipes you are using and abandon them",
  "Display your talent",
  "Distort time",
  "Do nothing for as long as possible",
  "Do something boring",
  "Do the last thing first",
  "Do the washing up",
  "Do the words need changing?",
  "Do we need holes?",
  "Don't avoid what is easy",
  "Don't be frightened of cliches",
  "Don't break the silence",
  "Don't stress one thing more than another",
  "Dont be afraid of things because they're easy to do",
  "Dont be frightened to display your talents",
  "Emphasize differences",
  "Emphasize repetitions",
  "Emphasize the flaws",
  "Faced with a choice, do both (given by Dieter Rot)",
  "Feed the recording back out of the medium",
  "Fill every beat with something",
  "Find a safe part and use it as an anchor",
  "Get your neck massaged",
  "Ghost echoes",
  "Give the game away",
  "Give way to your worst impulse",
  "Go outside. Shut the door.",
  "Go slowly all the way round the outside",
  "Go to an extreme, come part way back",
  "Honor thy mistake as a hidden intention",
  "How would someone else do it?",
  "How would you have done it?",
  "Humanize something free of error",
  "Idiot glee (?)",
  "Imagine the piece as a set of disconnected events",
  "In total darkness, or in a very large room, very quietly",
  "Infinitesimal gradations",
  "Intentions\n--nobility of\n--humility of\n--credibility of",
  "Into the impossible",
  "Is it finished?",
  "Is something missing?",
  "Is the information correct?",
  "Is the style right?",
  "Is there something missing",
  "It is quite possible (after all)",
  "It is simply a matter of work",
  "Just carry on",
  "Left channel, right channel, center channel",
  "Listen to the quiet voice",
  "Look at the order in which you do things",
  "Look closely at the most embarrassing details & amplify them",
  "Lost in useless territory",
  "Lowest common denominator",
  "Magnify the most difficult details",
  "Make a blank valuable by putting it in an exquisite frame",
  "Make a sudden, destructive unpredictable action; incorporate",
  "Make an exhaustive list of everything you might do & do the last thing on the list",
  "Make it more sensual",
  "Make what's perfect more human",
  "Mechanicalize something idiosyncratic",
  "Move towards the unimportant",
  "Mute and continue",
  "Not building a wall but making a brick",
  "Once the search has begun, something will be found",
  "Only a part, not the whole",
  "Only one element of each kind",
  "Overtly resist change",
  "Pae White's non-blank graphic metacard",
  "Put in earplugs",
  "Question the heroic",
  "Reevaluation (a warm feeling)",
  "Remember those quiet evenings",
  "Remove a restriction",
  "Remove ambiguities and convert to specifics",
  "Remove specifics and convert to ambiguities",
  "Repetition is a form of change",
  "Retrace your steps",
  "Reverse",
  "Short circuit (example; a man eating peas with the idea that they will improve  his virility shovels them straight into his lap)",
  "Simple subtraction",
  "Simply a matter of work",
  "Slow preparation, fast execution",
  "Spectrum analysis",
  "State the problem as clearly as possible",
  "Take a break",
  "Take away the elements in order of apparent non-importance",
  "Take away the important parts",
  "Tape your mouth (given by Ritva Saarikko)",
  "The inconsistency principle",
  "The most important thing is the thing most easily forgotten",
  "The tape is now the music",
  "Think\n--inside the work\n--outside the work",
  "Think of the radio",
  "Tidy up",
  "Towards the insignificant",
  "Trust in the you of now",
  "Try faking it (from Stewart Brand)",
  "Turn it upside down",
  "Twist the spine",
  "Use 'unqualified' people",
  "Use an old idea",
  "Use an unacceptable color",
  "Use cliches",
  "Use fewer notes",
  "Use filters",
  "Use something nearby as a model",
  "Use your own ideas",
  "Voice your suspicions",
  "Water",
  "What are the sections sections of?    Imagine a caterpillar moving",
  "What are you really thinking about just now?",
  "What context would look right?",
  "What is the reality of the situation?",
  "What is the simplest solution?",
  "What mistakes did you make last time?",
  "What to increase? What to reduce? What to maintain?",
  "What would your closest friend do?",
  "What wouldn't you do?",
  "When is it for?",
  "Where is the edge?",
  "Which parts can be grouped?",
  "Work at a different speed",
  "Would anyone want it?",
  "You are an engineer",
  "You can only make one dot at a time",
  "You don't have to be ashamed of using your own ideas",
  "[blank white card]",
];

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "!" });

  function draw() {
    const random = Math.floor(Math.random() * (strategies.length + 1));
    // return strategies[random];
    setCard(strategies[random] || "Try again");
  }
  const [card, setCard] = useState<string>("Draw a card");

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
          <h1 className="text-2xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[3rem]">
            {card}
          </h1>
          <div className="flex flex-col items-center gap-12">
            <div>
              <button className="btn" onClick={draw}>
                Draw a new card
              </button>
            </div>

            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "One sec..."}
            </p> */}
            <AuthShowcase />
          </div>
          <div>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                What is this?
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                  <Link
                    className="text-gray flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                    href="./dashboard"
                  >
                    <h3 className="text-2xl font-bold">What is this?</h3>
                    <div className="text-lg">
                      <p>
                        Get messages inspiring your creativity, your
                        productivity, or just reminders to stretch-- it&lsquo;s
                        all up to you!
                      </p>
                      <p>
                        (There will be a demo here, but right now this takes you
                        to your main page.)
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="text-gray flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                    href="./dashboard"
                  >
                    <h3 className="text-2xl font-bold">How does it work?</h3>
                    <div className="text-lg">
                      <p>Log in, then manage your own Categories and Cards.</p>
                      <p>
                        (An FAQ will be here, but right now this takes you to
                        your main page.)
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
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
