import styled, { css } from "styled-components";

export default function Button({
  type,
  children,
  color,
  size,
  onClick
}) {
  return (
    <StyledButton
      type={type}
      color={color}
      size={size}
      onClick={onClick}
    >{children}</StyledButton>
  )
}

const StyledButton = styled.button`
  width: 111px;
  padding: 7px;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  background-color: #fff;
  border-radius: 111px;
  color: ${({theme}) => theme.color.black};
  border: 1px solid ${({theme}) => theme.color.black};
  cursor: pointer;
  &:hover{
    background-color: ${({theme}) => theme.color.hoverWhite};
  }
  ${props => props.size === "small" && css`
    width: 100px;
  `}
  ${props => props.size === "big" && css`
    width 264px;
    padding: 16px;
    font-size: 24px;
    line-height: 30px;
  `}
  ${props => props.color === "black" && css`
    background-color: ${({theme}) => theme.color.black};
    color: #fff;
    &:hover{
      background-color: ${({theme}) => theme.color.hoverBlack};
    }
  `}
  ${props => props.color === "grey" && css`
    background-color: ${({theme}) => theme.color.grey};
    border: 1px solid ${({theme}) => theme.color.grey};
    color: #fff;
    &:hover{
      background-color: ${({theme}) => theme.color.hoverGrey};
      border: 1px solid ${({theme}) => theme.color.hoverGrey};
    }
  `}
`;