import styled, { keyframes } from "styled-components";

const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <div className="spinner"></div>
    </Container>
  );
};

export default LoadingSpinner;

const spinnerAni = keyframes`
  from {transform: rotate(0deg);} 
  to {transform: rotate(360deg);}
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 5px solid ${({ theme }) => theme.color.lightGrey};
    border-left-color: ${({ theme }) => theme.color.black};
    animation: ${spinnerAni} 1s infinite linear;
  }
`;
