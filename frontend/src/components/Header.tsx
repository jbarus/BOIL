import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div>

            <Link to={'/CPM'}>Lista CPM</Link> |  <Link to={'/CPM/new'}>Dodaj</Link>
        </div>
    )
}