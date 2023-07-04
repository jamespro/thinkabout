import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "~/utils/api";

type Card = RouterOutputs["card"]["getAll"][0];

export const CardCard = ({
  card,
  onDelete,
}: {
  card: Card;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{card.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{card?.content || ""}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          {/* I want this to load the current note's title and contents in the CardEditor in the page */}
          {/* or it could load a new CardEditor right in this component? */}
          {/* or make an new component just for upsert and load that one right in this component?  */}
          {/* or load upsert component elsewhere on the page? */}
          {/* Or on a new separate Update page? */}
          {/* <button className="btn-warning btn-xs btn px-5" onClick={}>
            Edit
          </button> */}
          {/* TODO: ACTUALLY HOW ABOUT JUST A MODAL THAT POPS UP FROM manage.tsx?? EXCEPT manage.tsx loads this component... so EDIT button will need to be in here.  */}

          <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
