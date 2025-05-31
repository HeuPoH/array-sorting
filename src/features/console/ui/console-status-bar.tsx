import './console.scss';

interface Props {
  msgNumber: number;
}

export const ConsoleStatusBar: React.FC<Props> = ({ msgNumber }) => {
  return <span className='console__status-bar'>{`Сообщений: ${msgNumber}`}</span>;
};
