import { DetailedHTMLProps, HTMLAttributes } from "react";

export function Quote(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
): JSX.Element {
  return <article {...props} className="blockquote" />;
}
