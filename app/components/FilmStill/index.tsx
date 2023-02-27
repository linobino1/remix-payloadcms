import type { FilmStill as FilmStillType } from "payload/generated-types"
import React from "react"
import { useTranslation } from "react-i18next"
import { mediaUrl } from "~/util/mediaUrl"

export type ImageResponsive = {
  size: keyof FilmStillType['sizes']
  maxWidth: string
}

export type Props = {
  className?: string
  filmstill: FilmStillType
  responsive: ImageResponsive[]
}

const url = (filename: string): string => mediaUrl(`filmstills/${filename}`)

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const FilmStill: React.FC<Props> = ({
  className, filmstill, responsive,
}) => {
  const { t } = useTranslation();
  return (
    <img
      src={url(filmstill.filename as string)}
      alt={t('film still') as string}
      className={className}
      srcSet={responsive.map((item) => (
        filmstill.sizes[item.size].filename && `${url(filmstill.sizes[item.size].filename as string)} ${filmstill.sizes[item.size].width}w`
      )).filter(Boolean).join(', ')}
      sizes={responsive.map((item) => (
        filmstill.sizes[item.size].filename && `${item.maxWidth} ${filmstill.sizes[item.size].width}px`
      )).filter(Boolean).join(', ')}
    />
  )
}

export default FilmStill;
