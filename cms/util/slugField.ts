import type { Field, FieldHook } from 'payload/types';
import slugify from 'slugify';

export const format = (s: string): string => {
  if (!s) return s;
  return slugify(s, {
    lower: true,
  });
};

export const slugHook = (fallback: string): FieldHook => ({ value, originalDoc, data }) => {
  if (typeof value === 'string') {
    return format(value);
  }
  const fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

  if (fallbackData && typeof fallbackData === 'string') {
    return format(fallbackData);
  }

  return value;
};

export const slugField = (fallback: string): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      slugHook(fallback),
    ],
  },
});
