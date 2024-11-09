import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { token } = useAuth();

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
                <div
                    className="navbar-collapse collapse"
                    id="navbarText"
                >
                    <ul className="navbar-nav mb-lg-0 mb-2 me-auto">
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
                            <a
                                className="nav-link text-light"
                                href="#feedback"
                            >
                                Feedbacks
                            </a>
                        </li>
                        <li>
                            <a
                                className="nav-link text-light"
                                href="#about"
                            >
                                About Us
                            </a>
                        </li>
                        <li className="nav-link text-light">
                            <Link
                                className="text-light"
                                style={{ textDecoration: 'none' }}
                                to={token ? '/admin/dashboard' : '/auth'}
                            >
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
