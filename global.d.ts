interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const url: string
  export const ReactComponent: SvgrComponent

  export default url
}
