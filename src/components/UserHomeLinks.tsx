import Link from "next/link";
//TODO: map!! are you getting the data from props, or is it already here? or ctx?
export const UserHomeLinks: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        <Link href="dashboard">Switch to (Name of User Deck 1) →</Link>
      </button>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        <Link href="dashboard">Switch to (Name of User Deck 2) →</Link>
      </button>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        <Link href="dashboard">Go to your Dashboard →</Link>
      </button>
    </div>
  );
};
