/* eslint-disable no-case-declarations */
import React from 'react';
import Blocks from '~/components/Blocks';
import { parseISO } from 'date-fns';
import type { PostsListBlock, ScreeningsListBlock } from '~/types/blocks';
import { isPostsList, isScreeningsList } from '~/types/blocks';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/PageHeader';
import { MAX_DATE, MIN_DATE } from '~/util/date';
import classes from './index.module.css';

export const loader = async ({ params, context: { payload }}: LoaderArgs) => {
  const pageDocs = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.page,
      },
    },
  });
  const page = pageDocs.docs[0];

  const postsList: PostsListBlock | undefined = page.layout?.find(isPostsList);
  const screeningsList: ScreeningsListBlock | undefined = page.layout?.find(isScreeningsList);
  
  let posts = null;
  if (postsList) {
    posts = await payload.find({
      collection: 'posts',
      where: {
        and: [
          {
            date: {
              greater_than_equal: postsList.from as string
                ? parseISO(postsList.from as string)
                : MIN_DATE,
            },
          },
          {
            date: {
              less_than_equal: postsList.until as string
                ? parseISO(postsList.until as string)
                : MAX_DATE,
            },
          },
        ],
      },
    });
  }

  let screenings = null;
  if (screeningsList) {
    screenings = await payload.find({
      collection: 'screenings',
      where: {
        and: [
          {
            date: {
              greater_than_equal: screeningsList.from as string
                ? parseISO(screeningsList.from as string)
                : MIN_DATE,
            },
          },
          {
            date: {
              less_than_equal: screeningsList.until as string
                ? parseISO(screeningsList.until as string)
                : MAX_DATE,
            },
          },
        ],
      },
    });
  }

  console.log(screenings)
  return {
    page,
    posts: posts?.docs,
    screenings: screenings?.docs,
  }
}

export const meta: MetaFunction = ({ data }) => ({
  charset: "utf-8",
  title: data.page.title,
  viewport: "width=device-width,initial-scale=1",
});

export const PageComponent: React.FC = () => {
  const { page, posts, screenings } = useLoaderData<typeof loader>();

  return (
    <div className={classes.page}>
      <PageHeader />
      <div className={classes.mainstage}>
        <Blocks
          layout={page.layout}
          posts={posts}
          screenings={screenings}
        />
      </div>
    </div>
  );
};

export default PageComponent;