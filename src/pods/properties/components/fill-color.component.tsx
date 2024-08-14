interface Props {
  color: string;
  onChange: (color: string) => void;
}

export const FillColorComponent: React.FC<Props> = ({ color, onChange }) => {
  return (
    <div>
      <label>Fill color</label>
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
