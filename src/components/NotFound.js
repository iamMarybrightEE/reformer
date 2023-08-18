import { useRouteError } from "react-router-dom"

const NotFound = () => {
  const error = useRouteError()
  return (
    <div>{error.message}</div>
  )
}

export default NotFound