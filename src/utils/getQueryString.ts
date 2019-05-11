  export default ({ query, search }: { query: string, search: string}) => {
    // E.g. /(?:search\=)([^\&]*)/; gets ?search=something&...
    const searchQueryRegexp = new RegExp("(?:" + query + "\=)([^\&]*)");
    const searchQuery = searchQueryRegexp.exec(search);
    return searchQuery ? searchQuery[1] : "";
  };
