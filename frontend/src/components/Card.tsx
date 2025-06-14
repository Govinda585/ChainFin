import { type ReactNode } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  cardNavigation: string;
  cardTitle: string;
  cardDesc: string;
  cardIcon: ReactNode;
};

const Card = ({ cardNavigation, cardTitle, cardDesc, cardIcon }: CardProps) => {
  return (
    <Link
      to={cardNavigation}
      className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-200"
    >
      {cardIcon}
      <h2 className="text-xl font-semibold mb-2">{cardTitle}</h2>
      <p className="text-gray-600 text-sm">{cardDesc}</p>
    </Link>
  );
};

export default Card;
