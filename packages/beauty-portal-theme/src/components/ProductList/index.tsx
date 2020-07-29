import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { urlFor } from '../../helpers/imageUrl';
import './styles.scss';

const ProductList: FunctionComponent<ProductListInterface> = ({
  data,
  title,
}) => {
  return (
    <section className="bp-productList">
      <h2 className="bp-productList_title">{title}</h2>
      <div className="bp-grid col-container">
        {data &&
          data.map(product => (
            <div className="col col-xs-4 bp-grid_item" key={product.name}>
              <Link
                className="bp-grid_link"
                to={product.path || product.slug.current}
              >
                {product.image && (
                  <figure>
                    <picture>
                      <source
                        media="screen and (min-width: 1280px)"
                        srcSet={`${urlFor(product.image)
                          .width(140)
                          .fit('max')
                          .auto('format')
                          .url()
                          .toString()}, ${urlFor(product.image)
                          .width(280)
                          .auto('format')
                          .fit('max')
                          .url()
                          .toString()} 2x`}
                      />
                      <source
                        media="screen and (min-width: 768px)"
                        srcSet={`${urlFor(product.image)
                          .width(127)
                          .fit('max')
                          .auto('format')
                          .url()
                          .toString()}`}
                      />
                      <source
                        media="screen and (min-width: 320px)"
                        srcSet={`${urlFor(product.image)
                          .width(116)
                          .auto('format')
                          .fit('max')
                          .url()
                          .toString()}`}
                      />
                      <img
                        src={urlFor(product.image)
                          .width(116)
                          .auto('format')
                          .fit('max')
                          .url()}
                        alt={product.image.alt}
                      />
                    </picture>
                  </figure>
                )}
                <h3 className="bp-productList_subTitle">
                  <span>{product.name}</span>
                </h3>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

interface ProductListInterface {
  data: any;
  title: string;
}
export default ProductList;
