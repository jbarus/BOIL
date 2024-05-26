import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div>

            <Link to={'/transport'}>Middleman</Link> |  <Link to={'/CPM/new'}>CPM</Link>
        </div>
    )
}