import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }: { children: React.ReactElement }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  return <React.Fragment>{isMobile && children}</React.Fragment>;
};

export const NotMobile = ({ children }: { children: React.ReactElement }) => {
  const isNotMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return <React.Fragment>{isNotMobile && children}</React.Fragment>;
};
