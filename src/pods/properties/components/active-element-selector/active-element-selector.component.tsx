import classes from './active-element-selector.component.module.css';

interface Props {
  text?: string;
  type?: string;
  activeElement: number;
  label: string;
  onChange: (activeElement: number) => void;
}

export const ActiveElementSelector: React.FC<Props> = ({
  text,
  type,
  activeElement,
  label,
  onChange,
}) => {
  // Function to parse the tabsbar text and get the names of the tabs
  const extractElementNames = (text: string): string[] => {
    return text
      .split('\n')[0]
      .trim()
      .split(',')
      .map(elementName => elementName.trim())
      .filter(elementName => elementName.length > 0);
  };

  // Checking whether the type is tabsBar and parsing the text
  const isElementTypeSupported =
    type === 'tabsBar' || 'buttonBar' || 'horizontal-menu';
  const elementNames =
    isElementTypeSupported && text ? extractElementNames(text) : [];

  const handleActiveElementChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(Number(e.target.value));
  };

  return (
    isElementTypeSupported &&
    elementNames.length > 0 && (
      <div className={classes.container}>
        <p>{label}</p>
        <select
          value={activeElement}
          onChange={handleActiveElementChange}
          className={classes.select}
        >
          {elementNames.map((elementName, index) => (
            <option key={index} value={index} className={classes.select}>
              {elementName}
            </option>
          ))}
        </select>
      </div>
    )
  );
};
