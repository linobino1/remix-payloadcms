import type { Poster as PosterType } from "payload/generated-types"
import React from "react"
import { useTranslation } from "react-i18next"
import { mediaUrl } from "~/util/mediaUrl"

export type ImageResponsive = {
  size: keyof PosterType['sizes']
  maxWidth: string
}

export type Props = {
  className?: string
  poster: PosterType
  responsive: ImageResponsive[]
}

const url = (filename: string): string => mediaUrl(`posters/${filename}`)

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const Poster: React.FC<Props> = ({
  className, poster, responsive,
}) => {
  const { t } = useTranslation();
  return (
    <img
      src={url(poster.filename as string)}
      alt={t('poster') as string}
      className={className}
      srcSet={responsive.map((item) => (
        poster.sizes[item.size].filename && `${url(poster.sizes[item.size].filename as string)} ${poster.sizes[item.size].width}w`
      )).filter(Boolean).join(', ')}
      sizes={responsive.map((item) => (
        poster.sizes[item.size].filename && `${item.maxWidth} ${poster.sizes[item.size].width}px`
      )).filter(Boolean).join(', ')}
    />
  )
}

export default Poster;
