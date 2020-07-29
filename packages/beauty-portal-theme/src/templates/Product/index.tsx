import React from 'react';
import { graphql, Link } from 'gatsby';
import { useInView } from 'react-intersection-observer';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import Tags from 'src/components/Tags';
import RichText from 'src/components/RichText';
import { urlFor } from '../../helpers/imageUrl';
import './styles.scss';

const ProductPage = (props: ProductPageProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px',
  });
  const {
    data: {
      page,
      products: { nodes: productNodes },
    },
  } = props;

  page.seo = page.seo || {};

  return (
    <Layout>
      <SEO
        lang={'en-us'}
        title={page.name}
        description={page.description}
        keywords={page.keywords}
      />
      <Breadcrumb tag={page.tags[0]} pageTitle={page.name} />
      <div className="bp-container">
        <div className="bp-productDetail">
          <div className="col-container">
            <div className="col col-6">
              <div className="bp-productDetail_image">
                <>
                  <link
                    rel="preload"
                    as="image"
                    href={`${urlFor(page._rawImage)
                      .width(500)
                      .height(500)
                      .fit('crop')
                      .auto('format')
                      .quality(80)
                      .url()
                      .toString()}`}
                  />
                  <figure>
                    <picture
                      className="bp-image__placeholder"
                      style={{
                        paddingTop: `100%`,
                        background: `url(${page._rawImage.asset.metadata.lqip})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <img
                        className="bp-slider_image"
                        srcSet={`${urlFor(page._rawImage)
                          .width(500)
                          .height(500)
                          .fit('crop')
                          .auto('format')
                          .quality(80)
                          .url()
                          .toString()} 500w`}
                        src={`${urlFor(page._rawImage)
                          .width(500)
                          .height(500)
                          .quality(80)
                          .fit('crop')
                          .auto('format')
                          .url()
                          .toString()}`}
                        alt={page._rawImage.alt}
                      />
                    </picture>
                  </figure>
                </>
              </div>
            </div>
            <div className="col col-6">
              <h1 className="bp-productDetail_title h1">{page.name}</h1>
              <div className="bp-productDetail_desc">
                {page._rawMarketingDescription && (
                  <RichText data={page._rawMarketingDescription} />
                )}
              </div>
              <div className="bp-productDetail_usage">
                {page._rawUsageDetails && (
                  <RichText data={page._rawUsageDetails} />
                )}
              </div>
              <div className="bp-productDetail_ingredients">
                {page._rawIngredients && (
                  <RichText data={page._rawIngredients} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bp-related_products" ref={ref} data-inview={inView}>
          <h2 className="bp-related_products-title mb20">
            More Products We Love
          </h2>
          {inView && (
            <div className="col-container">
              {productNodes.map(item => (
                <div className="col col-3" key={item.name + item.id}>
                  <Link className="link txt-bold txt-center" to={item.path}>
                    <div>
                      <figure>
                        <picture
                          className="bp-image__placeholder"
                          style={{
                            paddingTop: `100%`,
                            background: `url(${item._rawImage.asset.metadata.lqip})`,
                            backgroundSize: 'cover',
                          }}
                        >
                          <img
                            className="bp-slider_image"
                            srcSet={`${urlFor(item._rawImage)
                              .width(500)
                              .height(500)
                              .fit('crop')
                              .auto('format')
                              .quality(80)
                              .url()
                              .toString()} 250w`}
                            src={`${urlFor(item._rawImage)
                              .width(500)
                              .height(500)
                              .quality(80)
                              .fit('crop')
                              .auto('format')
                              .url()
                              .toString()}`}
                            alt={item._rawImage.alt}
                          />
                        </picture>
                      </figure>
                    </div>
                    <p>{item.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        {page.tags.length > 0 && (
          <Tags data={page.tags} title={'Find something else'} />
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;

export const query = graphql`
  query($slug: String!, $tags: [String!], $id: [String!]) {
    products: allSanityProduct(
      filter: { tags: { elemMatch: { name: { in: $tags } } }, id: { nin: $id } }
      limit: 3
      sort: { fields: _createdAt, order: DESC }
    ) {
      nodes {
        ...ProductFieldsTile
      }
    }
    page: sanityProduct(id: { eq: $slug }) {
      ...ProductFieldsFull
    }
  }
`;

interface ProductPageProps {
  data: {
    page: any;
    products: any;
  };
  pageContext: {
    slug: string;
    title: string;
  };
}
