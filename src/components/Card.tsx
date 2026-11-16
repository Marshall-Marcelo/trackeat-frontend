import { cn } from '@/lib/utils/cn';

interface CardProps {
  cardTitle: string;
  cardValue: string | number;
  className?: string;
  cardDescription?: string;
}

const Card = ({
  cardTitle = 'Sample',
  cardValue = '2',
  className,
  cardDescription,
}: CardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-2 rounded-lg shadow text-lg',
        className,
      )}
    >
      <span className="text-sm font-light">{cardTitle}</span>
      <span className="text-3xl">{cardValue}</span>
      {cardDescription && (
        <span className="text-xs font-light">{cardDescription}</span>
      )}
    </div>
  );
};

export default Card;
