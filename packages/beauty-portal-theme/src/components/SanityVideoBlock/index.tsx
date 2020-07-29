import React, { FunctionComponent } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { SanityVideoBlockInterface } from './models';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { getYouTubeId } from '../../helpers/youtube';
import './styles.scss';

const SanityVideoBlock: FunctionComponent<SanityVideoBlockInterface> = ({
  videoBlock,
  _rawTextBlockBody,
}) => {
  return (
    <section className="bp-videoBlock">
      <div className="bp-container">
        <div className="bp-videoBlock_content">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeId(
              videoBlock.url
            )}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="bp-videoBlock_copy">
            <h2 className="bp-videoBlock_name">{videoBlockName}</h2>
            {_rawTextBlockBody && (
              <BlockContent
                serializers={blockTypeDefaultSerializers}
                blocks={_rawTextBlockBody}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanityVideoBlock;
