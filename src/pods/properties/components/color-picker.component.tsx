interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;

  return (
    <div>
      <label>{label}</label>
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
