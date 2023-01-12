import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon text-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <a
                                className="nav-link active text-light"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="nav-link text-light" href="#feedback">
                                Feedbacks
                            </a>
                        </li>
                        <li>
                            <a className="nav-link text-light" href="#about">
                                About Us
                            </a>
                        </li>
                        <li className="nav-link text-light">
                            <Link
                                className="text-light"
                                style={{ textDecoration: 'none' }}
                                to={'/admin'}
                            >
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
