interface SearchResultsHeaderProps {
  query: string
  count: number
}

export function SearchResultsHeader({ query, count }: SearchResultsHeaderProps) {
  return (
    <p className="text-sm text-gray-600">
      {query ? (
        <>
          <span className="font-semibold text-gray-900">{count.toLocaleString()}</span> results for{' '}
          <span className="font-semibold text-gray-900">&ldquo;{query}&rdquo;</span>
        </>
      ) : (
        <>
          <span className="font-semibold text-gray-900">{count.toLocaleString()}</span> products
        </>
      )}
    </p>
  )
}
