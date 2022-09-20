import "./title.css"

function Title(props: { children: string }) {
  return <h1 className="title">{props.children}</h1>
}

export default Title
