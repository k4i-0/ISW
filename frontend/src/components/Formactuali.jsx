import axios from "../services/root.service";
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

async function actualizarPregunta(data){
    const datos = JSON.stringify(data);
    const res = await axios.put('/examinador/question',datos).finally();
    //alert(res.data);
    return res;
}

export default function Fromactuali(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const datos = location.state;
    //console.log(datos);
    
    const {handleSubmit,register} = useForm();
    
    const onSubmit1 = (data) => {
        // console.log('Data:', datos._id);
        if(data.pregunta == ""){
            data.pregunta = location.state.pregunta
            // console.log(data.pregunta);
        }
        for (let i = 0; i<4; i++) {
            if(data.Alternativa[i] == ""){
                data.Alternativa[i] = location.state.Alternativa[i]
                // console.log(data.Alternativa[i]);
            }
        }
        if(data.respuesta == ""){
            data.respuesta = location.state.respuesta
            // console.log(data.respuesta);
        }
        data.id = datos._id
        actualizarPregunta(data).then(() => {
            // console.log(data);
            navigate(props.ruta);
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
                    <input type="submit" value="Enviar" />
                </form>
                </div>
            <br />
        </>
    );
}