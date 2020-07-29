import React, { FunctionComponent, useState } from 'react';
import SwiperCore, { Thumbs, Navigation, Pagination, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { urlFor } from '../../helpers/imageUrl';
import PageSchema from '../PageSchema';
import './styles.scss';

SwiperCore.use([Thumbs, Navigation, Pagination, Lazy]);

const Gallery: FunctionComponent<GalleryInterface> = ({
  data,
  slug,
  name,
  authorName,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <PageSchema type={'ImageGallery'} {...{ name, slug, data, authorName }} />
      <div className="bp-gallery">
        <Swiper
          spaceBetween={10}
          slidesPerView={8}
          freeMode={true}
          watchSlidesVisibility={false}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
          lazy={true}
        >
          {data.picture.map((picture: any) => (
            <SwiperSlide key={picture.asset._id}>
              <figure>
                <picture
                  className="bp-image__placeholder"
                  style={{
                    paddingTop: '100%',
                    background: `url(${picture.asset.metadata.lqip})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <img
                    className="bp-slider_image swiper-lazy"
                    data-srcset={`${urlFor(picture)
                      .width(40)
                      .height(40)
                      .fit('max')
                      .auto('format')
                      .quality(80)
                      .url()
                      .toString()} 414w,
                      ${urlFor(picture)
                        .width(80)
                        .height(80)
                        .quality(80)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()} 500w`}
                    alt={picture.alt}
                  />
                </picture>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={0}
          thumbs={{ swiper: thumbsSwiper }}
          pagination={{ clickable: true }}
          navigation
          lazy={true}
          watchSlidesVisibility={false}
        >
          {data.picture.map((picture: any, index: number) => (
            <SwiperSlide key={picture.asset._id}>
              <figure>
                {index === 0 && (
                  <link
                    rel="preload"
                    as="image"
                    href={`${urlFor(picture)
                      .width(500)
                      .height(500)
                      .quality(80)
                      .fit('max')
                      .auto('format')
                      .url()
                      .toString()}`}
                  />
                )}
                <picture
                  className="bp-image__placeholder"
                  style={{
                    paddingTop: '100%',
                    background: `url(${picture.asset.metadata.lqip})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <img
                    className="bp-slider_image swiper-lazy"
                    data-srcset={`${urlFor(picture)
                      .width(414)
                      .height(414)
                      .fit('max')
                      .auto('format')
                      .quality(80)
                      .url()
                      .toString()} 414w,
                      ${urlFor(picture)
                        .width(500)
                        .height(500)
                        .quality(80)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()} 500w`}
                    alt={picture.alt}
                  />
                </picture>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

interface GalleryInterface {
  data: any;
  slug?: string;
  name?: string;
  authorName?: string;
}
export default Gallery;
