import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface CheckboxProps {
  id: React.Key;
  name?: string;
  defaultChecked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  defaultChecked,
  onChange,
}) => {
  const [isChecked, setChecked] = useState(defaultChecked ?? false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e);
  };

  return (
    <CheckboxContainer>
      <label htmlFor={String(id)}>
        {isChecked ? (
          <img
            src="images/icon-check-fill.svg"
            alt="checkbox"
          />
        ) : (
          <img
            src="images/icon-check-box.svg"
            alt="checkbox"
          />
        )}
      </label>
      <input
        type="checkbox"
        id={String(id)}
        onChange={handleChange}
      />
    </CheckboxContainer>
  );
};

export default Checkbox;

const CheckboxContainer = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  label {
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  input {
    display: none;
  }
`;
