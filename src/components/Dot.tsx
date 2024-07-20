import * as React from "react";

interface DotProps {
  dotIndex: number;
  currentIndex: number;
  dotStyle?: React.CSSProperties;
  activeNavDotWidth: number
  nonActiveNavDotWidth: number
  activeNavDotColor: string,
  nonActiveNavDotColor: string,
}

const Dot:React.FC<DotProps> = ({ currentIndex, dotIndex, dotStyle, activeNavDotWidth, nonActiveNavDotWidth, activeNavDotColor = "black", nonActiveNavDotColor = "grey" }: DotProps)=> {
  const width = currentIndex === dotIndex ? activeNavDotWidth : nonActiveNavDotWidth;
  const height = currentIndex === dotIndex ? activeNavDotWidth : nonActiveNavDotWidth;
  const navDotsStyle = {
    width: width,
    height: height,
    borderRadius: currentIndex === dotIndex ? activeNavDotWidth/2 : nonActiveNavDotWidth/2,
    backgroundColor: currentIndex === dotIndex ? activeNavDotColor : nonActiveNavDotColor,
    marginInline: 2,
  };
  return <div style={{ ...navDotsStyle, ...(dotStyle || {}) }}></div>;
}

export default Dot