import { Menu } from '@headlessui/react'
import { ArchiveIcon, ChevronDownIcon } from '@primer/octicons-react'

const menuOptions = [
  { name: 'All topics', isSelectAll: true },
  { name: '💡 Feature Request', isSelectAll: false },
  { name: '📝 Feedback', isSelectAll: false },
]

export default function FilterMenu() {
  return (
    <div className="relative text-sm text-[#B2B8CD]">
      <Menu>
        <Menu.Button className="flex justify-between items-center py-1.5 px-3 rounded bg-[#242837] hover:bg-[#2b3040]">
          <ArchiveIcon size={16} className="mr-2" />
          <span>Filter</span>
          <ChevronDownIcon size={16} className="ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute w-56 mt-1 py-1 bg-[#242837] rounded overflow-hidden">
          {menuOptions.map((option, key) => (
            <Menu.Item
              key={key}
              className="flex items-center w-full hover:bg-[#2b3040] py-1.5 px-3 cursor-pointer"
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
