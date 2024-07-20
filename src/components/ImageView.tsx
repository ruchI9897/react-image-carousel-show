import * as React from "react";
import { memo } from "react"

interface ImageViewProps {
  src: string;
  imageStyle: any;
  onImageLoad?:() => void
}

const ImageView :React.FC<ImageViewProps> = ({ src, imageStyle, onImageLoad }: ImageViewProps)=> {
  return <img src={src} style={imageStyle} onLoad={() => onImageLoad && onImageLoad()} />;
}

export default ImageView