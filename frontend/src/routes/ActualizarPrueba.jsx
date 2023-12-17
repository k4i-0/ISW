import { useNavigate } from "react-router-dom";
import Formulario from "../components/FormularioEnvio";
import cookies from "js-cookie";
import axios from "../services/root.service";
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

async function actualizarPregunta(data){
    const datos = JSON.stringify(data);
    const res = await axios.put('/examinador/question',datos);
    alert(res.data);
    return res;
}


export default function actualizarPrueba(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const datos = location.state;
    //console.log(datos);
    
    const {handleSubmit,register} = useForm();
    
    const onSubmit1 = (data) => {
        console.log('Data:', data);
        actualizarPregunta(data).then(() => {
            console.log(data);
        });
    };
    return(
        <>
            <h1>Formulario Actualizacion</h1>
            <br />
                <div>
                <form onSubmit={handleSubmit(onSubmit1)}>
                    <label>Pregunta</label>
                    <br />
                    <input type="text" name='pregunta' placeholder={location.state.pregunta} {...register('pregunta')}/>
                    <br />
                    <label>Alternativa</label>
                    <br />
                    <input type="text" name="Alternativa[0]" placeholder={location.state.Alternativa[0]} {...register('Alternativa[0]')}/>
                    <br />
                    <input type="text" name="Alternativa[1]" placeholder={location.state.Alternativa[1]} {...register('Alternativa[1]')} />
                    <br />
                    <input type="text" name="Alternativa[2]" placeholder={location.state.Alternativa[2]} {...register('Alternativa[2]')} />
                    <br />
                    <input type="text" name="Alternativa[3]" placeholder={location.state.Alternativa[3]} {...register('Alternativa[3]')} />
                    <br />
                    <label>Respuesta</label>
                    <br />
                    <input type="text" name="respuesta"  placeholder={location.state.respuesta} {...register('respuesta')} />
                    <br />
                    <input type="submit" value="Enviar" onClick={navigate('/crea-prueba')} />
                </form>
                </div>
            <br />
            <button onClick={()=>navigate('/crear-prueba')}>Volver</button>
        </>
    );
}