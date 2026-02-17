import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { validateEmail } from "../Forms/validation";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        setMensaje("");

        const errorEmail = validateEmail(email);
        if (errorEmail) {
            setError(errorEmail);
            setCargando(false);
            return;
        }

        try {
            await axios.post(
                "https://api-harrypotter.miniweb.ar/harrypotter/forgot-password",
                { email }
            );

            setMensaje(
                "Si el email existe, recibirás un correo con instrucciones."
            );
        } catch (err) {
            setMensaje(
                "Si el email existe, recibirás un correo con instrucciones."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <h2>Olvidé mi contraseña</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                {msg && <p style={{ color: "green" }}>{msg}</p>}


                <button type="submit" disabled={cargando}>
                    {cargando ? "Enviando..." : "Enviar instrucciones"}
                </button>

                <p style={{ marginTop: "10px" }}>
                    <Link to="/home">
                        ← Volver a Home
                    </Link>
                </p>

            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
