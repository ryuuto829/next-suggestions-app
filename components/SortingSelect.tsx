import { Listbox } from '@headlessui/react'
import { CodeIcon } from '@primer/octicons-react'

import SortingOption from '@components/SortingOption'

const selectOptions = [
  { icon: 'clock', name: 'Recent' },
  { icon: 'zap', name: 'Most voted' },
]

export default function SortingSelect() {
  const selected = selectOptions[1] // TODO: change to useState()

  return (
    <div className="relative w-44 text-sm text-[#B2B8CD]">
      <Listbox value={selected} onChange={() => console.log('select')}>
        <Listbox.Button className="flex justify-between items-center w-full py-1.5 px-3 rounded bg-[#242837] hover:bg-[#2b3040]">
          <span className="flex items-center">
            <SortingOption icon={selected.icon} name={selected.name} />
          </span>
          <span className="flex items-center">
            <CodeIcon size={16} className="rotate-90 h-4 w-4" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 py-1 bg-[#242837] w-full rounded overflow-hidden">
          {selectOptions.map((selected, key) => (
            <Listbox.Option
              key={key}
              value={selected}
              className="flex items-center w-full hover:bg-[#2b3040] py-1.5 px-3 cursor-pointer"
            >
              <SortingOption icon={selected.icon} name={selected.name} />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
