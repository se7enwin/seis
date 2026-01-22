import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Forms() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await login(userData); // 🔥 UNA sola llamada
    //         navigate("/home");
    //     } catch (error) {
    //         console.log(error);
    //         alert("Error al loguearse");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email: userData.email, password: userData.password });
            navigate("/home");
        } catch (error) {
            alert(error.response?.data?.msg || "Error al loguearse");
        }
    };


    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h3>Iniciar sesión</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <p style={{ marginTop: "10px" }}>
                ¿No tenés cuenta?{" "}
                <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate("/register")}
                >
                    Registrate aquí
                </span>


                <p style={{ marginTop: "10px" }}>
                    <Link to="/forgot-password">
                        Olvide mi contraseña
                    </Link>
                </p>
            </p>
        </div>
    );
}
