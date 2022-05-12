import SortingSelect from '@components/SortingSelect'
import FilterMenu from '@components/FilterMenu'

export default function Home() {
  return (
    <main className="my-32 bg-[#1E222E] max-w-2xl mx-auto rounded px-12 py-16">
      <header>
        <h1 className="text-xl">📚 Next Suggestions App</h1>
        <p className="text-sm text-gray-200 mt-2">
          Let us know how we can improve. Vote on existing ideas or suggest new ones.
        </p>
      </header>
      <div className="flex mt-12 justify-between items-center">
        <div className="flex justify-between items-center">
          <SortingSelect />
          <FilterMenu />
        </div>
        <div>
          <button className="bg-[#4F46E5] py-2 px-4 rounded text-sm">Make suggestion</button>
        </div>
      </div>
    </main>
  )
}
