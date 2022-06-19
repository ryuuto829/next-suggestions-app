export function EmptyNavigationBar() {
  return (
    <div className="absolute top-5 right-5 sm:top-6 sm:right-8">
      <div className="flex items-center animate-pulse">
        <div className="rounded h-5 w-16 bg-[color:var(--light-blue-charcoal-color)] mr-3" />
        <div className="mr-3 h-5 w-28 bg-[color:var(--light-blue-charcoal-color)] rounded" />
        <div className="w-8 h-8 rounded-full bg-[color:var(--light-blue-charcoal-color)]" />
      </div>
    </div>
  )
}

export function EmptyPosts() {
  return (
    <>
      {Array.from(Array(3).keys()).map((id) => (
        <div
          key={id}
          className="animate-pulse flex sm:items-center items-start justify-between sm:flex-row flex-col py-4"
        >
          <div className="w-full">
            <div className="h-5 w-36 bg-[color:var(--light-blue-charcoal-color)] rounded" />
            <div className="h-5 w-52 bg-[color:var(--light-blue-charcoal-color)] mt-2 rounded" />
            <div className="flex items-center mt-2.5">
              <div className="h-5 w-24 px-2 py-1 bg-[color:var(--light-blue-charcoal-color)] rounded mr-4" />
            </div>
          </div>
          <div className="h-8 w-16 px-2 py-1 bg-[color:var(--light-blue-charcoal-color)] rounded mr-4" />
        </div>
      ))}
    </>
  )
}
