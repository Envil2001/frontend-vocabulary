export function searchItemByTitle(dataQuery, searchQuery) {
    const lowercasedQuery = searchQuery.toLowerCase();
    return dataQuery?.filter((item) => {
        return item.title.toLowerCase().includes(lowercasedQuery);
    });
}