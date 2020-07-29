import React, { FunctionComponent, useState, createRef } from 'react';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import {
  InstantSearch,
  Index,
  connectStateResults,
  RefinementList,
  ClearRefinements,
  CurrentRefinements,
  SearchBox,
  InfiniteHits,
  SortBy,
  Panel,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';
import * as hitComps from '../../components/HitComp';
import classNames from 'classnames';
import { ReactComponent as IconList } from '../../images/icons/list.svg';
import { ReactComponent as IconGrid } from '../../images/icons/grid.svg';
import './styles.scss';

const indices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `PostHit` },
];
const SearchResults: FunctionComponent = () => {
  const ref = createRef();
  const [focus, setFocus] = useState(false);
  const [viewType, setViewType] = useState('list');
  const createURL = state => `?${qs.stringify(state)}`;
  const searchStateToUrl = ({ location }, searchState) =>
    searchState ? `${location.pathname}${createURL(searchState)}` : '';
  const urlToSearchState = ({ search }) => {
    return search ? qs.parse(search.slice(1)) : {};
  };
  const DEBOUNCE_TIME = 400;
  const searchClient = algoliasearch(
    process.env['algolia_app_id'],
    process.env['algolia_search_api_key']
  );
  const Results = connectStateResults(
    ({ searchState, searchResults, children }) =>
      searchResults && searchResults.nbHits !== 0 ? children : null
  );

  const Stats = connectStateResults(
    ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits}`
  );
  const [searchState, setSearchState] = useState(() => {
    return typeof window !== `undefined`
      ? urlToSearchState(location)
      : urlToSearchState({});
  });
  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.pushState(
          searchStateToUrl(updatedSearchState),
          updatedSearchState
        );
      }, DEBOUNCE_TIME)
    );

    setSearchState(updatedSearchState);
  };

  const handleViewType = event => {
    setViewType(event.currentTarget.dataset.view);
  };
  return (
    <Layout>
      <SEO lang={'en-us'} title="Search" description="" keywords="" />
      <div className="bp-container bp-search">
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
          root={{ props: { ref } }}
        >
          <div className="col-container">
            <div className="col bp-search_content">
              <SearchBox searchAsYouType={true} />
            </div>
            <div className="col bp-search_content">
              <div className="bp-search_results">
                <span className="bp-search_query">
                  {searchState.query
                    ? `Results for ${searchState.query}`
                    : 'All Results'}
                </span>
                <span className="bp-search_stats">
                  <Stats
                    translations={{
                      stats(nbHits) {
                        return `(${nbHits})`;
                      },
                    }}
                  />
                </span>
              </div>
              <div className="bp-search_refinements">
                <CurrentRefinements clearsQuery />
              </div>
            </div>
            <div className="col col-3 bp-search_filters">
              <div className="bp-search_filters-content">
                <span>Filter by</span>
                <ClearRefinements clearsQuery />
              </div>
              <div className="filter-wrapper">
                <div>
                  <Panel header="Page Type">
                    <RefinementList
                      attribute="pageType"
                      limit={2}
                      showMoreLimit={50}
                      showMore={true}
                    />
                  </Panel>
                </div>
                <div className="filter">
                  <Panel header="Tags">
                    <RefinementList
                      attribute="tags.name"
                      limit={4}
                      showMoreLimit={50}
                      showMore={true}
                    />
                  </Panel>
                </div>
                <div className="filter">
                  <div>
                    <Panel header="Category">
                      <RefinementList
                        attribute="tags.tagCategory.name"
                        limit={4}
                        showMoreLimit={50}
                        showMore={true}
                      />
                    </Panel>
                  </div>
                </div>
                <div className="filter">
                  <div>
                    <Panel header="Duration">
                      <RefinementList
                        attribute="duration"
                        limit={2}
                        showMoreLimit={50}
                        showMore={true}
                        transformItems={items =>
                          items.map(item => ({
                            ...item,
                            label: `${item.label} mins`,
                          }))
                        }
                      />
                    </Panel>
                  </div>
                </div>
                <div className="filter">
                  <div>
                    <Panel header="Difficulty">
                      <RefinementList attribute="difficulty" />
                    </Panel>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-contianer col col-9">
              <div className="col-xs-12">
                <div className="bp-search_actions">
                  <button
                    type="button"
                    className={classNames(
                      'bp-search_icon',
                      viewType === 'list' ? 'is-active' : null
                    )}
                    data-view="list"
                    onClick={handleViewType}
                  >
                    <IconList />
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      'bp-search_icon',
                      viewType === 'grid' ? 'is-active' : null
                    )}
                    data-view="grid"
                    onClick={handleViewType}
                  >
                    <IconGrid />
                  </button>
                </div>
                <div
                  className={classNames('bp-search_wrapper', viewType)}
                  show="true"
                >
                  {indices.map(({ name, hitComp }) => (
                    <Index key={name} indexName={name}>
                      <Results>
                        <InfiniteHits
                          showPrevious={false}
                          hitComponent={hitComps[hitComp](() =>
                            setFocus(false)
                          )}
                        />
                      </Results>
                    </Index>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </Layout>
  );
};
export default SearchResults;
