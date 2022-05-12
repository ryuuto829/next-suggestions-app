import { ClockIcon, ZapIcon } from '@primer/octicons-react'

export type SortingOptionProps = {
  icon: string | 'clock' | 'zap'
  name?: string
}

export default function SortingOption({ icon, name }: SortingOptionProps) {
  return (
    <>
      <span className="mr-2">
        {icon === 'clock' && <ClockIcon size={16} className="h-4 w-4" aria-hidden="true" />}
        {icon === 'zap' && <ZapIcon size={16} className="h-4 w-4" aria-hidden="true" />}
      </span>
      <span className="block truncate">{name}</span>
    </>
  )
}
