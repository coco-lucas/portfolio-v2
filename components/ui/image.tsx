"use client"

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Image({ src, alt, className, tabIndex, ...props }: { src: string; alt: string; className?: string; tabIndex?: number }) {
  return (
    <Zoom zoomMargin={10} classDialog="custom-zoom">
      <img
        src={src}
        alt={alt}
        className={`rounded-lg transition-transform duration-300 ease-in-out hover:scale-101 max-h-80 ${className}`}
        tabIndex={tabIndex}
        {...props}
      />
    </Zoom>
  );
}