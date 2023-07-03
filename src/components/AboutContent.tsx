import Link from "next/link";

export const AboutContent: React.FC = () => {
  return (
    <div>
      <div tabIndex={0} className="collapse bg-base-200">
        <div className="collapse-title text-xl font-medium">What is this?</div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="text-gray flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="./dashboard"
            >
              <h3 className="text-2xl font-bold">What is this?</h3>
              <div className="text-lg">
                <p>
                  Get messages inspiring your creativity, your productivity, or
                  just reminders to stretch-- it&lsquo;s all up to you!
                </p>
              </div>
            </Link>
            <Link
              className="text-gray flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="./dashboard"
            >
              <h3 className="text-2xl font-bold">How does it work?</h3>
              <div className="text-lg">
                <p>Log in, then manage your own Decks of Cards.</p>
                <p>Go to Dashboard ➡️</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
