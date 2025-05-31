import './card.scss';

interface Props {
  label: string
}

export const CardTitle: React.FC<Props> = ({ label }) => {
  return <h4 className='card__title'>{label}</h4>;
};
