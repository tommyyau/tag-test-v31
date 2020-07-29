import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { ReactComponent as Search } from '../../images/icons/search.svg';

const SiteSearch: FunctionComponent = () => {
  return (
    <div className="bp-globalSearch">
      <Link to="/search-results" className="bp-globalSearch_button">
        <Search />
        <span className="srOnly">Search</span>
      </Link>
    </div>
  );
};

export default SiteSearch;
