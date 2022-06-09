import { Listbox } from '@headlessui/react'
import { CodeIcon, ClockIcon, ZapIcon } from '@primer/octicons-react'

const selectOptions = [
  { icon: <ClockIcon size={16} className="h-4 w-4" aria-hidden="true" />, name: 'Recent' },
  { icon: <ZapIcon size={16} className="h-4 w-4" aria-hidden="true" />, name: 'Most voted' },
]

export default function SortingSelect() {
  const selected = selectOptions[1]

  return (
    <div className="relative w-44 text-sm text-[color:var(--dark-gray-charcoal-color)]">
      <Listbox value={selected} onChange={() => console.log('[SortingSelect] select')}>
        <Listbox.Button className="flex justify-between items-center w-full py-1.5 px-3 rounded bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)]">
          <span className="flex items-center">
            <span className="mr-2">{selected.icon}</span>
            <span className="block truncate">{selected.name}</span>
          </span>
          <span className="flex items-center">
            <CodeIcon size={16} className="rotate-90 h-4 w-4" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 py-1 bg-[color:var(--blue-charcoal-color)] w-full rounded overflow-hidden border border-gray-500/10">
          {selectOptions.map((option, key) => (
            <Listbox.Option
              key={key}
              value={option}
              className="flex items-center w-full hover:bg-[color:var(--light-blue-charcoal-color)] py-1.5 px-3 cursor-pointer"
            >
              <span className="mr-2">{option.icon}</span>
              <span className="block truncate">{option.name}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
