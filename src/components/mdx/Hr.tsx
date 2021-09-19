import * as React from 'react'
import { ReactComponent as DecorationIcon } from '../../images/icons/decoration.svg'

export function Hr(): JSX.Element {
  return (
    <div className="flex justify-center mt-10 -mb-2 text-center text-gray-400 juistify-center">
      <DecorationIcon
        width={48}
        height={48}
        stroke="currentColor"
        strokeWidth={6}
      />
    </div>
  )
}
