import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ConfirmarCuenta() {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const confirmar = async () => {
            try {
                const { data } = await axios.get(
                    `https://api-harrypotter.miniweb.ar/harrypotter/confirm/${token}`
                );
                setMensaje(data.msg);
            } catch (error) {
                setMensaje("Token inválido o expirado");
            }
        };

        confirmar();
    }, [token]);

    return <h3>{mensaje}</h3>;
}
