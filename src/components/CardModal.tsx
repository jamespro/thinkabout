import { useSession } from "next-auth/react";
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

export const CardModal: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: defaultDeck } = api.deck.getDefaultDeck.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { data: defaultCard } = api.card.getOne.useQuery(
    {
      deckId: defaultDeck?.id || "",
    },
    { enabled: sessionData?.user !== undefined }
  );
  return (
    <>
      {defaultCard && (
        <div>
          <button className="btn" onClick={() => window.my_modal_2.showModal()}>
            Show me a Card
          </button>
          <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
              <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                ✕
              </button>{" "}
              {defaultDeck && <p className="py-4">{defaultDeck.title}</p>}
              <h3 className="text-lg font-bold">{defaultCard.title}</h3>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};
