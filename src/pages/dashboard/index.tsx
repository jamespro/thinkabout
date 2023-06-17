import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { DashboardHeader } from "~/components/DashboardHeader";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard: Create, Read, Update, Delete"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader headerText={"Dashboard"} />
      <main>
        <div className="m-6">
          <ul>
            <li>
              <Link href="dashboard/view" className="underline">
                View Cards
              </Link>
            </li>
            <li>
              <Link href="dashboard/manage" className="underline">
                Manage Cards
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Profile;
