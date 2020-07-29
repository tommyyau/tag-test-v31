import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import './styles.scss';

const SiteMap: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query siteMap {
      galleryArticles: allSanityGalleryArticle {
        nodes {
          ...GalleryFieldsTile
        }
      }

      howToArticles: allSanityHowToArticle {
        nodes {
          ...HowToFieldsTile
        }
      }

      featureArticles: allSanityFeatureArticle {
        nodes {
          ...FeatureFieldsTile
        }
      }
      products: allSanityProduct {
        nodes {
          ...ProductFieldsTile
        }
      }
    }
  `);
  const {
    products: { nodes: productNodes },
    galleryArticles: { nodes: galleryNodes },
    howToArticles: { nodes: howToNodes },
    featureArticles: { nodes: featureNodes },
  } = data;

  return (
    <div className="bp-sitemap">
      <div>
        <h2 className="bp-sitemap_title">Products</h2>
        <ul className="bp-list">
          {productNodes.map(item => (
            <li key={item.id} className="bp-list_item">
              <Link to={item.path} className="bp-list_link">
                {item.name || item.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="bp-sitemap_title">Gallery Articles</h2>
        <ul className="bp-list">
          {galleryNodes.map(item => (
            <li key={item.id} className="bp-list_item">
              <Link key={item.id} to={item.path} className="bp-list_link">
                {item.name || item.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="bp-sitemap_title">HowTo Articles</h2>
        <ul className="bp-list">
          {howToNodes.map(item => (
            <li key={item.id} className="bp-list_item">
              <Link key={item.id} to={item.path} className="bp-list_link">
                {item.name || item.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="bp-sitemap_title">Feature Articles</h2>
        <ul className="bp-list">
          {featureNodes.map(item => (
            <li key={item.id} className="bp-list_item">
              <Link key={item.id} to={item.path} className="bp-list_link">
                {item.name || item.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SiteMap;
