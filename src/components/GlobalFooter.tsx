import { signIn, signOut, useSession } from "next-auth/react";
import { AboutContent } from "../components/AboutContent";
import Link from "next/link";
import { Children } from "react";

interface ChildComponentProps {
  footerText?: string;
}
export const GlobalFooter: React.FC<ChildComponentProps> = ({ footerText }) => {
  const { data: sessionData } = useSession();

  return (
    <footer>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1 pl-5 text-3xl font-bold">{footerText}</div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <div className="flex items-center"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};
