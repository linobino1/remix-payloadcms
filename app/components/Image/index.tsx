import React from "react"

export type Props = {
  src: string
  width?: number
  height?: number
  alt: string
  className?: string
  fill?: boolean
}

export const Image: React.FC<Props> = ({
  src, width, height, alt, className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

export default Image;
