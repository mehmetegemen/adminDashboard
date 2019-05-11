import React, { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getQueryString from "../../utils/getQueryString";

import "./SearchBar.scss";

const SearchBar: FunctionComponent<RouteComponentProps & {
  placeholder?: string,
  width: string,
}> = (props) => {
  const { placeholder, width } = props;
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.history.push(
      props.location.pathname
      + "?search="
      + event.currentTarget.value);
  };

  const searchQueryString = getQueryString(
    {
      query: "search",
      search: props.location.search,
    },
  );
  return (
    <div
      className="search-bar"
      style={{maxWidth: width}}
    >
      <i className="fas fa-search" />
      <input
        type="text"
        placeholder={placeholder ? placeholder : ""}
        onChange={handleChange}
        value={searchQueryString}
      />
    </div>
  );
};

export default withRouter(SearchBar);
