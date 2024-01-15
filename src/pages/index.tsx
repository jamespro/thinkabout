import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { GlobalHeader } from "~/components/GlobalHeader";
import { GlobalFooter } from "~/components/GlobalFooter";
import { ObliqueCard } from "../components/ObliqueCard";
import { ShowCard } from "~/components/ShowCard";
import { AboutContent } from "../components/AboutContent";
import { UserHomeLinks } from "../components/UserHomeLinks";
import { UserDecks } from "../components/UserDecks";
import { UserPrefs } from "../components/UserPrefs";
import { DebugInfo } from "../components/DebugInfo";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "!" });

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
      <GlobalFooter footerText={""} />
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
  //NOTE: check for prefs. If no prefs, create default prefs. (I was able to put the creation into the tPRC procedure)

  const { data: pref } = api.pref.getPref.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  //TODO: Now this should go to user PREFs, check/update "currentDeck"
  //TODO: point to "getDefaultDeckData" instead
  const { data: defaultDeck } = api.deck.getDefaultDeck.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: defaultCard } = api.card.getOne.useQuery(
    {
      deckId: defaultDeck?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!sessionData && <ObliqueCard />}
      {sessionData && !defaultCard && (
        <>
          <ObliqueCard />
          <h1 className="text-white">Create your own custom cards!</h1>
        </>
      )}
      {sessionData && defaultCard && <ShowCard />}
      {secretMessage && <span> - {secretMessage}</span>}

      {sessionData && <UserDecks />}
      {sessionData && <UserPrefs />}
      {sessionData && <DebugInfo />}
    </div>
  );
};
