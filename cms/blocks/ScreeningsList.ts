import type { Block } from "payload/types";

export const ScreeningsList: Block = {
  slug: 'screeningsList',
  fields: [
    {
      name: 'from',
      type: 'date',
    },
    {
      name: 'until',
      type: 'date',
    },
  ],
};

export default ScreeningsList;
