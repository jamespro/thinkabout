import Link from "next/link";

export const UserLinks: React.FC = () => {
  return (
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
  );
};
