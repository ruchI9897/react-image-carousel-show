import * as React from "react";
import ImageView from "./ImageView";
import "./styles.css";
import Dot from "./Dot";

const imageStyle:React.CSSProperties = { objectFit: "cover", width: "100%" };

interface ImageContainerProps {
    images: Array<string>;
    itemWidth: number;
    itemHeight: number;
    animation?: string;
    autoPlay?: boolean;
    loop?: boolean;
    dotStyle?: React.CSSProperties;
    navDotsContainerStyle?: React.CSSProperties;
    imageContainerStyle?: React.CSSProperties;
    imagePropsStyle?: React.CSSProperties;
    buttonContainerStyle?: React.CSSProperties;
    leftButtonStyle?: React.CSSProperties;
    rightButtonStyle?: React.CSSProperties;
    onImageLoad?: () => void;
    onLeftBtnPress?: () => void;
    onRightBtnPress?: () => void;
    autoPlayDuration?: number
    fadeInEffectDuration?: number
    activeNavDotWidth?: number
    nonActiveNavDotWidth?: number
    activeNavDotColor?: string,
    nonActiveNavDotColor?: string,
    imageCarouselContainerStyle?:React.CSSProperties;
    showVerticalScrollBar?: boolean
}

const ImageSlideshow: React.FC<ImageContainerProps> = ({
  images,
  autoPlay = false,
  loop = false,
  itemWidth,
  itemHeight,
  animation = "default",
  dotStyle,
  navDotsContainerStyle,
  imageContainerStyle,
  imagePropsStyle,
  buttonContainerStyle,
  leftButtonStyle,
  rightButtonStyle,
  onImageLoad,
  onLeftBtnPress,
  onRightBtnPress,
  autoPlayDuration = 5000,
  fadeInEffectDuration = 3000,
  activeNavDotWidth = 8,
  nonActiveNavDotWidth = 6,
  activeNavDotColor = "black",
  imageCarouselContainerStyle,
  nonActiveNavDotColor = "grey",
  showVerticalScrollBar = true
}: ImageContainerProps) => {

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animatedImageStyle, setAnimatedStyle] = React.useState(imageStyle);
  const divRef: React.MutableRefObject<HTMLDivElement|null>  = React.useRef<HTMLDivElement>(null);
  const timerRef : React.MutableRefObject<NodeJS.Timeout | null> = React.useRef<NodeJS.Timeout | null>(null);
  const nextItemCallback: React.MutableRefObject<(() => void) | null> = React.useRef<(() => void )| null>(null);
  const fadeInAnimationRef : React.MutableRefObject<NodeJS.Timeout | null> = React.useRef<NodeJS.Timeout | null>(null);

  const containerStyle : React.CSSProperties = {
    display: "flex",
    width: itemWidth,
    backgroundColor: "white",
    height: itemHeight,
    position: "relative",
    overflow: "auto",
    alignItems: "center",
    scrollBehavior: "smooth",
    overflowX : showVerticalScrollBar ? 'auto' : 'hidden'
  };

  const scroll = React.useCallback((offset: number) => {
    if (divRef && divRef.current!) {
      const newOffset = divRef.current!.scrollLeft + offset;
      const offsetWidth = newOffset % itemWidth;
      if (offsetWidth > 0) {
        if (offset > 0) {
          divRef.current!.scrollLeft += itemWidth - offsetWidth;
        } else {
          divRef.current!.scrollLeft -= offsetWidth;
        }
      } else {
        divRef.current!.scrollLeft += offset;
      }
    }
  },[]);

  const onLeftPress = React.useCallback(() => {
    if (animation === "default") {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (loop) {
        setCurrentIndex(images.length - 1);
      }
    } else scroll(-itemWidth);

    onLeftBtnPress && onLeftBtnPress();
  },[onLeftBtnPress, currentIndex, setCurrentIndex]);


  const isCurrentIndexValid = React.useCallback(() => {
    return currentIndex < images.length - 1
  },[currentIndex, images])

  const onRightPress = React.useCallback(() => {
    if (animation === "default") {
      if (isCurrentIndexValid()) {
        setCurrentIndex((prev) => prev + 1);
      } else if (loop) {
        setCurrentIndex(0);
      }
    } else {
      if (isCurrentIndexValid()) {
        scroll(itemWidth);
      } else if (divRef && divRef.current! && loop) {
        divRef.current!.scrollLeft = 0;
      }
    }
    onRightBtnPress && onRightBtnPress();
  },[isCurrentIndexValid, setCurrentIndex, onRightBtnPress]);

  React.useEffect(() => {
    if (autoPlay) {
      clearInterval(timerRef.current!);
      timerRef.current! = setInterval(() => nextItemCallback.current!(), autoPlayDuration);
    }
  }, [currentIndex]);

  const handleOnScroll = React.useCallback((e: any) => {
    const scrollIndex = Math.floor(e.target.scrollLeft / itemWidth);
    setCurrentIndex(scrollIndex);
  },[setCurrentIndex]);

  nextItemCallback.current! = React.useCallback(() => {
    onRightPress();
  },[onRightPress]);

  React.useEffect(() => {
    if (autoPlay) {
      clearInterval(timerRef.current!);
      timerRef.current! = setInterval(() => nextItemCallback.current!(), autoPlayDuration);
    }
    return () => {
        clearInterval(timerRef.current!);
        clearTimeout(fadeInAnimationRef.current!)
    }
  }, [nextItemCallback.current]);

  const startAnimation = React.useCallback(() => {
    const ani = { ...imageStyle, animation: "fadeIn 3s" };
    setAnimatedStyle(ani);
    fadeInAnimationRef.current! = setTimeout(() => setAnimatedStyle(imageStyle), fadeInEffectDuration);
    onImageLoad && onImageLoad();
  },[imageStyle, setAnimatedStyle, fadeInAnimationRef.current, onImageLoad]);

  const btnContainerStyle = { width: itemWidth, height: itemHeight };


  return (
    <div style={{ ...(imageCarouselContainerStyle || {}) }}>
      <div
        className="buttonContainer"
        style={{ ...btnContainerStyle, ...(buttonContainerStyle || {}) }}
      >
        <button
          className={"button"}
          onClick={onLeftPress}
          style={leftButtonStyle}
        >
          {"<"}
        </button>
        <button
          className="rightButton"
          onClick={onRightPress}
          style={rightButtonStyle}
        >
          {">"}
        </button>
      </div>
      {animation === "scroll" ? (
        <div
          style={{ ...containerStyle, ...(imageContainerStyle || {}) }}
          ref={divRef}
          onScroll={handleOnScroll}
        >
          {images.map((image, key) => (
            <ImageView
              src={image}
              imageStyle={{ ...animatedImageStyle, ...(imagePropsStyle || {}) }}
              onImageLoad={onImageLoad}
            />
          ))}
        </div>
      ) : (
        <div style={{ ...containerStyle, ...(imageContainerStyle || {}) }}>
          <img
            src={images[currentIndex]}
            style={{ ...imageStyle, ...(imagePropsStyle || {}) }}
            onLoad={startAnimation}
          />
        </div>
      )}

      <div
        className="navDotsContainer"
        style={{ width:itemWidth, ...(navDotsContainerStyle || {}) }}
      >
        {images.map((image, key) => (
          <Dot currentIndex={currentIndex} dotIndex={key} dotStyle={dotStyle} activeNavDotWidth={activeNavDotWidth} nonActiveNavDotWidth={nonActiveNavDotWidth} activeNavDotColor={activeNavDotColor} nonActiveNavDotColor={nonActiveNavDotColor} />
        ))}
      </div>
    </div>
  );
}

export default ImageSlideshow