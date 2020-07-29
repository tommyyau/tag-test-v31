import React, { FunctionComponent, useState } from 'react';
import { getYouTubeId } from '../../helpers/youtube';
import { urlFor } from '../../helpers/imageUrl';
import { ReactComponent as IconYoutube } from '../../images/icons/youtube.svg';
import { ReactComponent as Loader } from '../../images/icons/loader.svg';
import './styles.scss';

const Video: FunctionComponent<VideoInterface> = ({ videoMetaData }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSourceUrl, setVideoSourceUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);

  const playVideo = (event: any) => {
    setVideoLoading(true);
    setVideoSourceUrl(
      `https://www.youtube.com/embed/${getYouTubeId(
        event.currentTarget.dataset.url
      )}?autoplay=1`
    );
    setShowVideo(true);
  };

  const onFrameLoad = () => {
    setVideoLoading(false);
  };

  return (
    <section className="bp-video">
      <h2 className="bp-video_title">{videoMetaData.node.youTubeCaption}</h2>
      <div className="bp-video_image">
        {!showVideo && (
          <figure>
            <picture
              className="bp-image__placeholder"
              style={{
                paddingTop: `56.25%`,
                background: `url(${videoMetaData.node.heroImage.asset.metadata.lqip})`,
                backgroundSize: 'cover',
              }}
            >
              <source
                media="screen and (min-width: 1025px)"
                srcSet={`${urlFor(videoMetaData.node.heroImage)
                  .width(665)
                  .height(374)
                  .quality(80)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}`}
              />
              <source
                media="screen and (min-width: 560px)"
                srcSet={`${urlFor(videoMetaData.node.heroImage)
                  .width(436)
                  .height(245)
                  .quality(80)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}`}
              />
              <source
                media="screen and (min-width: 320px)"
                srcSet={`${urlFor(videoMetaData.node.heroImage)
                  .width(414)
                  .height(232)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}`}
              />
              <img
                src={urlFor(videoMetaData.node.heroImage)
                  .width(436)
                  .height(245)
                  .quality(80)
                  .fit('max')
                  .auto('format')
                  .url()}
                alt={videoMetaData.node.heroImage.alt}
              />
            </picture>
          </figure>
        )}
        {!showVideo && !videoLoading && (
          <button
            type="button"
            className="bp-video_icon"
            onClick={playVideo}
            data-url={videoMetaData.node.url}
          >
            <IconYoutube />
            <span className="srOnly">Play Video</span>
          </button>
        )}
        {videoLoading && (
          <div className="bp-preloader">
            <Loader />
          </div>
        )}
        {showVideo && (
          <iframe
            width="560"
            height="399"
            src={videoSourceUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={onFrameLoad}
          ></iframe>
        )}
      </div>
    </section>
  );
};

interface VideoInterface {
  videoMetaData: any;
  sanityConfig?: any;
}
export default Video;
