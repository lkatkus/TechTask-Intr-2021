export const getSearchQuery = (searchTitle: string): string =>
  searchTitle
    .trim()
    .split(/,\s*|\s/)
    .join(',');
