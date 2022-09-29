import "./title.css"

export function Title(props: { children: string }) {
  return <h1 className="title">{props.children}</h1>
}
