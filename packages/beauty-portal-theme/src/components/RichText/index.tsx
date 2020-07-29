import React, { FunctionComponent } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const ArticleBodyBlockContent: FunctionComponent<ArticleBodyBlockContentProps> = ({
  data,
}) => {
  return (
    <section className="bp-richtext">
      <BlockContent
        blocks={data}
        serializers={blockTypeDefaultSerializers}
        className={'hello'}
      />
    </section>
  );
};

export default ArticleBodyBlockContent;

interface ArticleBodyBlockContentProps {
  data: any;
}
