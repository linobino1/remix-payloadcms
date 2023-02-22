import React from 'react';
import type { Media } from 'payload/generated-types';
import { mediaUrl } from '~/util/mediaUrl';
import Image from '~/components/Image';

export const PostImage: React.FC<{ image: Media }> = ({ image }) => (
  <Image
    src={mediaUrl(image)}
    alt={image.alt}
    fill
  />
);
