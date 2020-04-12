import React from 'react'
import { OverflowMenuProps } from '@kitten/ui'
import { OverflowMenuShowcase } from './overflowMenuShowcase.component'

type OverflowMenuElement = React.ReactElement<OverflowMenuProps>

export const LeftEndOverflowMenu = (): OverflowMenuElement => {
  return (
    <OverflowMenuShowcase placement='left end'/>
  )
}
