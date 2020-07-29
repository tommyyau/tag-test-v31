import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { NewsletterPromoInterface } from './models';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const NewsletterPromo: FunctionComponent<NewsletterPromoInterface> = ({
  _rawBody,
  ctaLabel,
}) => {
  return (
    <section className="bp-newsletter">
      <div className="bp-newsletter_content">
        {_rawBody && (
          <h3 className="bp-newsletter_title">
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawBody}
            />
          </h3>
        )}
        <Link to="/subscribe/" className="bp-newsletter_link">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
};

export default NewsletterPromo;
