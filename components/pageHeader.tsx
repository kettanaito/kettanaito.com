import { ReactNode } from 'react'
import { Grid } from './grid'

interface Props {
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}

export function PageHeader({ title, subtitle, children }: Props): JSX.Element {
  return (
    <Grid className="my-20 lg:my-32 items-center">
      <div className="col-span-full lg:col-span-3">
        <h1 className="text-5xl font-extrabold leading-[1.14em]">{title}</h1>
        {subtitle ? (
          <p className="mt-5 text-2xl text-gray-500 leading-8">{subtitle}</p>
        ) : null}
      </div>
      {children ? (
        <div className="col-span-full lg:col-span-3 lg:justify-self-end text-gray-500 font-medium">
          {children}
        </div>
      ) : null}
    </Grid>
  )
}
