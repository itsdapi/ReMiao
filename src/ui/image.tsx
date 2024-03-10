import fallbackImage from "@/public/image/default-fallback-image.png";
import { Image as TaroImage } from "@tarojs/components";
import { memo, useState } from "react";
import { previewImage } from "@/lib/util";

const Image = memo(
  ({
    src,
    ariaLabel,
    className,
    style,
    height,
    width,
    children,
    preview,
  }: {
    children?: React.ReactNode;
    ariaLabel: string;
    src?: string;
    className?: string;
    style?: React.CSSProperties;
    height?: number;
    width?: number;
    preview?: boolean;
  }) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleClick = async () => {
      if (!src || !preview) return;
      await previewImage([src], {
        saveImage: true,
        menu: true,
      });
    };

    return (
      <TaroImage
        src={src ? src : fallbackImage}
        mode={"aspectFill"}
        style={{ height: height, width: width, ...style }}
        className={`${className} relative }`}
        lazyLoad
        fadeIn
        ariaLabel={ariaLabel}
        onLoad={() => {
          setLoaded(true);
        }}
        onClick={() => handleClick()}
      >
        <div
          className={`animate-blink transition-opacity absolute w-full h-full inset-x-0 inset-y-0 z-10 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        {children}
      </TaroImage>
    );
  }
);

export default Image;
