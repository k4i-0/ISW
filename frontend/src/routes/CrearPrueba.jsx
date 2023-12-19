import VistaPreguntas from '../components/Vistapreguntas';
import Formulario from '../components/Fromcrearpregunta';
import { useNavigate } from 'react-router-dom';

export default function crearPrueba(){
    const navigate = useNavigate();
    return(
        <div className='centeredForm' >
            <VistaPreguntas rutaEdit={'/actualizar-pregunta'}/>
            <Formulario/>
            <button onClick={()=>navigate('/vista-pruebas')}>VOLVER</button>
        </div>
    ); 
}