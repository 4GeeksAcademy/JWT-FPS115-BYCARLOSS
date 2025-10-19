import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<Link to="/" className="navbar-brand">
				Home
			</Link>
			<div className="ml-auto">
				<Link to="/signup" className="btn btn-outline-primary me-2">
					Registro
				</Link>
				<Link to="/login" className="btn btn-outline-success me-2">
					Login
				</Link>
				<button className="btn btn-danger" onClick={handleLogout}>
					Cerrar sesión
				</button>
			</div>
		</nav>
	);
};
