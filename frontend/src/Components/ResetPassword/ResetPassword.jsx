import { validate } from "../Forms/validation";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const ResetPassword = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    /* 🔒 Protección: solo logueado */
    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }
    }, [auth, navigate]);

    /* 🎨 DOM legacy (temporal) */
    useEffect(() => {
        const body = document.body;

        body.style.backgroundImage =
            'linear-gradient(rgba(0,0,255,0.5), rgba(255,255,0,0.5)), url("/Img/Background-1.png")';
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";

        document.title = "Resetear Contraseña";

        return () => {
            body.removeAttribute("style");
            document.title = "Harry Potter";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        const errors = validate({ password });
        if (errors.password) {
            setMensaje(errors.password);
            return;
        }

        if (password !== confirmPassword) {
            setMensaje("Las contraseñas no coinciden");
            return;
        }

        setCargando(true);

        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                "http://localhost:3010/harrypotter/reset-password",
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMensaje(data.msg || "Contraseña actualizada correctamente");

            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            setMensaje(
                error.response?.data?.msg || "Error al actualizar la contraseña"
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <h2>Cambiar contraseña</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={cargando}>
                    {cargando ? "Actualizando..." : "Actualizar contraseña"}
                </button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default ResetPassword;
