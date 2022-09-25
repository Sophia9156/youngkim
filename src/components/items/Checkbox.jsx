import { useState } from "react";
import styled from "styled-components";

export default function Checkbox({
  id,
  defaultChecked, 
  onChange
}) {
  const [isChecked, setChecked] = useState(defaultChecked | false);
  const handleChange = e => {
    setChecked(e.target.checked);
    onChange(e);
  }

  return (
    <CheckboxContainer>
      <label htmlFor={id}>
        {isChecked ? (
          <img src="images/icon-check-fill.svg" alt="checkbox" />
        ) : (
          <img src="images/icon-check-box.svg" alt="checkbox" />
        )}
      </label>
      <input type="checkbox" id={id} 
        onChange={handleChange}
      />
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  label{
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
    }
  }
  input {
    display: none;
  }
`;