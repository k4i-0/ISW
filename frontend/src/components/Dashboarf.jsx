import React from "react";
import '../index.css';
import { useNavigate } from 'react-router-dom';



export default function Dashboard(props) {
    const navigate = useNavigate();

    return (
        <div >
            <table>
                <tr>
                    <h1>Bienviendido {props.name}</h1>
                </tr>
                <tr>
                    <h2>{props.estado}</h2>
                </tr>
                <tr>
                    <tr>
                        <div>
                            <button onClick={() => navigate(props.ruta)}>{props.boton1}</button>
                        </div>
                    </tr>
                </tr>
            </table>                
        </div>
    );
}