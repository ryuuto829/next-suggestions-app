import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@primer/octicons-react'

const menuOptions = [
  { id: 0, name: 'All Topics / Reset', isSelectAll: true },
  { id: 1, name: '💡 Feature Request', isSelectAll: false },
  { id: 2, name: '📝 Feedback', isSelectAll: false },
]

export default function FilterMenu() {
  return (
    <div className="relative text-sm text-[color:var(--dark-gray-charcoal-color)]">
      <Menu>
        <Menu.Button className="flex justify-between items-center py-1.5 px-3 rounded bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)]">
          <span>Filter</span>
          <ChevronDownIcon size={16} className="ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 sm:left-0 w-56 mt-1 py-1 bg-[color:var(--blue-charcoal-color)] rounded overflow-hidden">
          {menuOptions.map((option) => (
            <Menu.Item
              key={option.id}
              className="flex items-center w-full hover:bg-[color:var(--light-blue-charcoal-color)] py-1.5 px-3 cursor-pointer"
            >
              <span className="block truncate" onClick={() => console.log('[FilterMenu] select')}>
                {option.name}
              </span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}
