import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div>

            <Link to={'/transport'}>Transportation</Link> |  <Link to={'/CPM/new'}>Dodaj</Link>
        </div>
    )
}