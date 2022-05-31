export default function EmptyNavigationBar() {
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
