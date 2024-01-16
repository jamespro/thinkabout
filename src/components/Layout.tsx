// components/Layout.js
import React from "react";
import type { PropsWithChildren } from "react";
import { GlobalHeader } from "~/components/GlobalHeader";
import { GlobalFooter } from "~/components/GlobalFooter";

type LayoutProps = {
  children: PropsWithChildren;
  headerText?: string;
  footerText?: string;
};

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  headerText,
  footerText,
}) => {
  return (
    <>
      <div id="globalWrapper" className="min-h-screen">
        <GlobalHeader headerText={headerText} />
        <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          {children}
        </main>
        <GlobalFooter footerText={footerText} />
      </div>
    </>
  );
};

export default Layout;
