import styled, { css } from "styled-components";

export default function Button({
  type,
  children,
  black,
  grey,
  small,
  big,
  onClick
}) {
  return (
    <StyledButton
      type={type}
      black={black}
      grey={grey}
      small={small}
      big={big}
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
    background-color: rgba(0, 0, 0, 0.05);
  }
  ${props => props.small && css`
    width: 100px;
  `}
  ${props => props.big && css`
    width 264px;
    padding: 16px;
    font-size: 24px;
    line-height: 30px;
  `}
  ${props => props.black && css`
    background-color: ${({theme}) => theme.color.black};
    color: #fff;
    &:hover{
      background-color: ${({theme}) => theme.color.black};
      color: rgba(255, 255, 255, 0.8);
    }
  `}
  ${props => props.grey && css`
    background-color: ${({theme}) => theme.color.grey};
    border: 1px solid ${({theme}) => theme.color.grey};
    color: #fff;
    &:hover{
      background-color: ${({theme}) => theme.color.hoverGrey};
      border: 1px solid ${({theme}) => theme.color.hoverGrey};
    }
  `}
`;