import React from 'react';
import classes from './font-size.module.css';

interface Props {
  fontSize: number | undefined;
  label: string;
  onChange: (fontSize: number) => void;
}

export const FontSize: React.FC<Props> = props => {
  const { label, fontSize, onChange } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(Number(value));
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <select value={fontSize} onChange={handleChange}>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="72">72</option>
      </select>
    </div>
  );
};
