import { useState, useEffect, useCallback } from "react";
import obliqueData from "~/obliqueData.json";

//NOTE: For the default card, this way kinda worked, until I made it into a component:
// function getRandomOblique(oblique: string[]): string {
//   const randomIndex = Math.floor(Math.random() * oblique.length);
//   return oblique[randomIndex] || "Try again";
// }

// function draw() {
//   setCard(getRandomOblique(oblique));
// }

// const [card, setCard] = useState<string>(() => getRandomOblique(oblique));

export const ObliqueCard: React.FC = () => {
  const [card, setCard] = useState<string>("");
  // NOTE: If you think the oblique data could be updated at some point, use state for it. Otherwise if it is static, don't need to use state.
  const [oblique, setOblique] = useState<string[]>(obliqueData);

  const draw = useCallback(() => {
    const random = Math.floor(Math.random() * oblique.length);
    setCard(oblique[random] || "Try again");
  }, [oblique]);

  useEffect(() => {
    draw(); // Call draw on initial render
  }, [draw]);

  return (
    <div className="flex flex-col items-center gap-12">
      <h3 className="font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2.5rem]">
        {card}
      </h3>
      <button className="btn" onClick={draw}>
        Draw a card
      </button>
    </div>
  );
};
