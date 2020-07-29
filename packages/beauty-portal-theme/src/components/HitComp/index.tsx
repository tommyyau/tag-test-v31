import React from 'react';
import { Link } from 'gatsby';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { useInView } from 'react-intersection-observer';

export const PostHit = clickHandler => ({ hit }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  const {
    path,
    title,
    image: { asset, alt },
  } = hit;
  return (
    <article ref={ref} data-inview={inView}>
      <Link
        className="ais-InfiniteHits-item__link"
        to={path}
        onClick={clickHandler}
        aria-label={title}
      >
        <div className="image-wrapper">
          <figure>
            {inView ? (
              <picture
                className="bp-image__placeholder"
                style={{
                  paddingTop: '100%',
                  background: `url(${asset.fluid.base64})`,
                  backgroundSize: 'cover',
                }}
              >
                <source
                  media="screen and (min-width: 1025px)"
                  srcSet={`${asset.url}?q=80&w=516&h=516&fit=crop&auto=format 1x, ${asset.url}?q=80&w=516&h=516&fit=crop&auto=format&dpr=2 2x`}
                />
                <source
                  media="screen and (min-width: 560px)"
                  srcSet={`${asset.url}?q=80&w=180&h=180&fit=crop&auto=format 1x, ${asset.url}?q=80&w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
                />
                <source
                  media="screen and (min-width: 320px)"
                  srcSet={`${asset.url}?q=80&w=80&h=80&fit=crop&auto=format 1x, ${asset.url}?q=80&w=160&h=160&fit=crop&auto=format&dpr=2 2x`}
                />
                <img
                  src={`${asset.url}?q=80&w=516&h=516&fit=crop&auto=format`}
                  alt={alt}
                />
              </picture>
            ) : null}
          </figure>
        </div>
        <div className="ais-InfiniteHits-item__copy">
          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
          <p className="ais-InfiniteHits-item__desc">
            <Snippet attribute="ingredientBody" hit={hit} tagName="mark" />
            <Snippet attribute="usageBody" hit={hit} tagName="mark" />
            <Snippet attribute="galleryBody" hit={hit} tagName="mark" />
            <Snippet attribute="howTobody" hit={hit} tagName="mark" />
            <Snippet attribute="featureBody" hit={hit} tagName="mark" />
            <span>{' [...]'}</span>
          </p>
        </div>
      </Link>
    </article>
  );
};
