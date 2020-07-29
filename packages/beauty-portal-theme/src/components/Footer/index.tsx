import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SocialMenu from '../SocialMenu';
import './styles.scss';
import BackToTop from '../BackToTop';
// import { ReactComponent as UnileverLogo } from '../../images/unilever-logo.svg';
import { ReactComponent as NewWindow } from '../../images/icons/launch.svg';

const Footer: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query footerNavigation {
      sanityNavBar(name: { eq: "Footer" }) {
        navItems {
          navL1 {
            name
            path
            externalLink
            landingPage{
              slug
              {current}
            }
          }
        }
      }
      brandInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
    }
  `);

  const externalLinkAttributes = {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
  return (
    <footer className="bp-footer" role="contentinfo" aria-label="footer">
      <SocialMenu links={data.brandInfo} />

      <nav
        className="bp-footer_wrapper"
        role="navigation"
        aria-label="Footer Navigation"
      >
        <ul className="bp-footer_items">
          {data.sanityNavBar.navItems.map(
            (navItem: {
              navL1: { name: string; path: string; externalLink: string, landingPage: any  };
            }) => (
              <li className="bp-footer_item" key={navItem.navL1.name}>
                <a
                  href={
                    navItem.navL1.externalLink ||
                    navItem.navL1.path ||
                    `/${navItem.navL1.landingPage.slug.current}`
                  }
                  className="bp-footer_link"
                  {...(navItem.navL1.externalLink
                    ? externalLinkAttributes
                    : null)}
                >
                  {navItem.navL1.name}
                  {navItem.navL1.externalLink && <NewWindow />}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
      <div className="bp-footer_secondary">
        {/* <UnileverLogo /> */}
        <p>Copyright &copy; {new Date().getFullYear()} Unilever.</p>
      </div>
      <BackToTop />
    </footer>
  );
};

export default Footer;
