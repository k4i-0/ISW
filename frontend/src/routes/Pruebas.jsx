import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pruebas() {
    const navigate = useNavigate();
    return(
        <>
            <div className="centeredForm">
                <h1 className="centro">Crear Pruebas</h1>
                <table className="centro">
                    <tr>
                        <td><button onClick={()=>navigate('/crear-prueba')}>B</button></td>
                        <td><button disabled>A</button></td>
                    </tr>
                    <tr>
                        <td><button disabled>D</button></td>
                    </tr>
                </table>
                <button onClick={()=>navigate('/')}>VOLVER</button>
            </div>
        </>
    );
}