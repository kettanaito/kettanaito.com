import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
): JSX.Element {
  return (
    <button
      {...props}
      className={['button button-base'].concat(props.className || '').join(' ')}
    />
  )
}
