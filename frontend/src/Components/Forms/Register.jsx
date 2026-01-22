import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        age: ''
    });

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3010/harrypotter/register", {
                email: userData.email,
                password: userData.password,
                age: userData.age
            });

            console.log("Usuario registrado correctamente");
            navigate('/'); // vuelve al login
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h3 style={{ color: 'violet' }}>Registrarse</h3>

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
                    <label>Edad</label>
                    <input
                        type="number"
                        name="age"
                        value={userData.age}
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

                <button type="submit">Registrarse</button>
            </form>

            <p style={{ marginTop: '10px' }}>
                ¿Ya tenés cuenta?{" "}
                <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate("/")}
                >
                    Iniciar sesión
                </span>
            </p>

            <p style={{ marginTop: "10px" }}>
                <Link to="/forgot-password">
                    Olvidé mi Password
                </Link>
            </p>

        </div>
    );
}
