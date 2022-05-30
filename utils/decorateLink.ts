/**
 * Remove query from the link pathname, like: '?post=1' -> '/post/1' or '/?login' -> '/login'
 * @param pathname - displayed url (with query)
 * @param query - parsed query object
 * @returns - decorated link (without query)
 */
export const decorateLink = (pathname: string, query: { [key: string]: any }) => {
  if (Object.keys(query).length !== 0) {
    const baseUrl = pathname.split('?')[0]
    const queryName = Object.keys(query)[0]
    const slug = query[queryName]

    return `${baseUrl}${queryName}${slug ? '/' + slug : ''}`
  }
}
