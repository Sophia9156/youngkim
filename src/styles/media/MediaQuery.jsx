import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({children}) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)"
  });
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

export const NotMobile = ({children}) => {
  const isNotMobile = useMediaQuery({
    query: "(min-width: 768px)"
  });
  return <React.Fragment>{isNotMobile && children}</React.Fragment>
}