import fallbackImage from "@/public/image/default-fallback-image.png";
import { Image as TaroImage } from "@tarojs/components";
import { memo, useState } from "react";

const Image = memo(
  ({
    src,
    ariaLabel,
    className,
    height,
    width,
    children,
  }: {
    children?: React.ReactNode;
    ariaLabel: string;
    src?: string;
    className?: string;
    height?: number;
    width?: number;
  }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    return (
      <TaroImage
        src={src ? src : fallbackImage}
        mode={"aspectFill"}
        style={{ height: height, width: width }}
        className={`${className} bg-gray-100 ${loaded ? "" : "animate-pulse"}`}
        lazyLoad
        fadeIn
        ariaLabel={ariaLabel}
        onLoad={() => {
          setLoaded(true);
        }}
      >
        {children}
      </TaroImage>
    );
  }
);

export default Image;
