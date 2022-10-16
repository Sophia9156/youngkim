import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';

const TopBtnContainer = styled.aside`
  position: fixed;
  right: 3%;
  bottom: 5vh;
  z-index: 10;
  cursor: pointer;
  transition: .5s;
  img{
    width: 56px;
    height: 56px;
    transition: .4s;
    &:hover{
      filter: brightness(0.95);
    }
  }
`;

export default function TopBtn() {
  const [isShowing, setShowing] = useState(false);

  useEffect(() => {
    const handleTopBtn = throttle(() => {
      window.scrollY > window.innerHeight ? setShowing(true) : setShowing(false);
    }, 200);
    document.addEventListener('scroll', handleTopBtn, {passive: true});
    return () => {
      document.removeEventListener('scroll', handleTopBtn);
    }
  }, []);

  return (
    <TopBtnContainer
    style={isShowing ? {
      opacity: 1,
      transform: 'translateY(0)',
      pointerEvents: 'fill'
    } : 
    {
      opacity: 0,
      transform: 'translateY(30%)',
      pointerEvents: 'none'
    }}>
      <img src="/images/arrow_upward.png" alt="top-btn" 
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }}
      />
    </TopBtnContainer>
  )
}