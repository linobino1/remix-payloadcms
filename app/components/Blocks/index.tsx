import React from 'react';
import type { Page, Post, Screening } from 'payload/generated-types';
import { Content } from '~/components/Blocks/Content';
import { PostsList } from '~/components/Blocks/PostsList';
import ScreeningsList from '~/components/Blocks/ScreeningsList';

type Layout = Page['layout'];

type Props = {
  layout: Layout
  className?: string
  posts?: Post[]
  screenings?: Screening[]
}

const Blocks: React.FC<Props> = ({
  layout, className, posts, screenings,
}) => (
  <div className={className}>
    {layout.map((block, i) => (
      <section key={i} className={block.blockType}>
        { (() => {
          switch (block.blockType) {
            case 'postsList':
              return <PostsList {...block} posts={posts as Post[]} />;

            case 'screeningsList':
              return <ScreeningsList {...block} screenings={screenings as Screening[]} />;

            default:
            case 'content':
              return <Content {...block} />;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Blocks;