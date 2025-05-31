interface Props {
  flexrow?: boolean;
  gap?: number;
}

export const Box: React.FC<React.PropsWithChildren<Props>> = ({ flexrow, gap, children }) => {
  const style: React.CSSProperties = {};
  if (flexrow) {
    style.display = 'flex';
  }
  style.gap = gap;

  return (
    <div style={style}>
      {children}
    </div>
  );
};
