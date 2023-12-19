import { useNavigate } from "react-router-dom";
import Fromactuali from "../components/Formactuali";

export default function actualizarPrueba(props) {
    const navigate = useNavigate();  
   
    return(
        <>
            <Fromactuali ruta={'/crear-prueba'}/>
            <button onClick={()=>navigate('/crear-prueba')}>Volver</button>
        </>
    );
}