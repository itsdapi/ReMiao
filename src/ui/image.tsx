import fallbackImage from "@/public/image/default-fallback-image.png";
import { ImageProps, Image as TaroImage } from "@tarojs/components";
import React from "react";
import { useState } from "react";

const Image = React.memo(
  ({
    src,
    mode,
    ariaLabel,
    className,
    height,
    width,
  }: {
    ariaLabel: string;
    src?: string;
    mode?: keyof ImageProps.Mode;
    className?: string;
    height?: number;
    width?: number;
  }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const img = (
      <TaroImage
        src={src ? src : fallbackImage}
        mode={mode}
        style={{ height: height, width: width }}
        className={`${className} bg-gray-100 ${loaded ? "" : "animate-pulse"}`}
        lazyLoad
        fadeIn
        ariaLabel={ariaLabel}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    );

    return img;
  }
);

export default Image;
