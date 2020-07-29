import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { TileStackerInterface } from './models';
import { urlFor } from '../../helpers/imageUrl';
import { useInView } from 'react-intersection-observer';
import { ReactComponent as PlayVideo } from '../../images/icons/play.svg';
import './styles.scss';

const TileStacker: FunctionComponent<TileStackerInterface> = ({
  slides,
  headline,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  const renderer = slide => {
    return (
      <div className="col-container">
        <div className="col col-4">
          <div ref={ref} data-inview={inView} key={slide.headline}>
            <div className="bp-tileStacker-item">
              <span className="bp-tileStacker_type">{slide._type}</span>
              <Link className="bp-tileStacker_link" to={slide.path}>
                <div className="bp-tileStacker_image">
                  <figure>
                    {inView ? (
                      <picture
                        className="bp-image__placeholder"
                        style={{
                          paddingTop: '100%',
                          background: `url(${slide._rawHeroImage.asset.metadata.lqip})`,
                          backgroundSize: 'cover',
                        }}
                      >
                        <source
                          media="screen and (min-width: 560px)"
                          srcSet={`${urlFor(slide._rawHeroImage)
                            .width(280)
                            .height(280)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <source
                          media="screen and (min-width: 320px)"
                          srcSet={`${urlFor(slide._rawHeroImage)
                            .width(160)
                            .height(160)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <img
                          className="bp-slider_image"
                          src={urlFor(slide._rawHeroImage)
                            .width(280)
                            .height(280)
                            .fit('max')
                            .url()}
                          alt={slide.heroImage.alt}
                        />
                      </picture>
                    ) : null}
                  </figure>
                  {slide.heroVideo && (
                    <span className="icon-play">
                      <PlayVideo />
                      <span hidden>Play Video</span>
                    </span>
                  )}
                </div>

                <h3 className="bp-tileStacker_headline">
                  <span>{slide.headline}</span>
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bp-tileStacker">
      <div className="bp-tileStacker_header">
        <h2 className="bp-tileStacker_title">{headline}</h2>
      </div>
      <div className="col col-3">{slides.map(slide => renderer(slide))}</div>
    </div>
  );
};

export default TileStacker;
