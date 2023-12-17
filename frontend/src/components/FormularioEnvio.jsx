import cookies from "js-cookie";
import axios from "../services/root.service";
import { useForm } from 'react-hook-form';
import { useNavigate} from "react-router-dom";


async function envioPregunta(data){
    const token = cookies.get('jwt-auth');
    const datos = JSON.stringify(data);
    const res = await axios.post('/examinador/question',datos);
    return res;
}

async function actualizarPregunta(data){
    const datos = JSON.stringify(data);
    //const res = await axios.put('/examinador/question',datos);
    console.log('funcion acti' + datos);
    return res;
}


export default function formularioEnvio(tipo){
    
    const navigate = useNavigate();
    const {handleSubmit,register} = useForm();
    
    const onSubmit1 = (data) => {
        console.log('Data:', data);
        actualizarPregunta(data).then(() => {
            console.log(data);
        });
    };
    /*
    if (tipo.tipo == 1) {
        const onSubmit = (data) => {
            console.log('Data:', data);
            envioPregunta(data).then(() => {
                console.log(data);
            });
        };
       
        return(
            <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Pregunta</label>
                        <br />
                        <input type="text" name='pregunta' placeholder={`${tipo.datos.pregunta}`}{...register('pregunta')}/>
                        <br />
                        <label>Alternativa</label>
                        <br />
                        <input type="text" name="Alternativa[0]" placeholder={`${tipo.datos.Alternativa[0]}`} {...register('Alternativa[0]')}/>
                        <br />
                        <input type="text" name="Alternativa[1]" placeholder={`${tipo.datos.Alternativa[1]}`} {...register('Alternativa[1]')} />
                        <br />
                        <input type="text" name="Alternativa[2]" placeholder={`${tipo.datos.Alternativa[2]}`} {...register('Alternativa[2]')} />
                        <br />
                        <input type="text" name="Alternativa[3]" placeholder={`${tipo.datos.Alternativa[3]}`} {...register('Alternativa[3]')} />
                        <br />
                        <label>Respuesta</label>
                        <br />
                        <input type="text" name="respuesta" placeholder={`${tipo.datos.respuesta}`} {...register('respuesta')} />
                        <br />
                        <input type="submit" value="Enviar" />
                    </form>
            </>
        );
    }else{*/
        if (tipo.tipo == 2){

        
            return(
                <>
                <div>
                    <form onSubmit={handleSubmit(onSubmit1)}>
                        <label>Pregunta</label>
                        <br />
                        <input type="text" name='pregunta' placeholder={`${tipo.datos.pregunta}`} {...register('pregunta')}/>
                        <br />
                        <label>Alternativa</label>
                        <br />
                        <input type="text" name="Alternativa[0]" placeholder={`${tipo.datos.Alternativa[0]}`} {...register('Alternativa[0]')}/>
                        <br />
                        <input type="text" name="Alternativa[1]" placeholder={`${tipo.datos.Alternativa[1]}`} {...register('Alternativa[1]')} />
                        <br />
                        <input type="text" name="Alternativa[2]" placeholder={`${tipo.datos.Alternativa[2]}`} {...register('Alternativa[2]')} />
                        <br />
                        <input type="text" name="Alternativa[3]" placeholder={`${tipo.datos.Alternativa[3]}`} {...register('Alternativa[3]')} />
                        <br />
                        <label>Respuesta</label>
                        <br />
                        <input type="text" name="respuesta" placeholder={`${tipo.datos.respuesta}`} {...register('respuesta')} />
                        <br />
                        <input type="submit" value="Modificar" onClick={()=>navigate('/crear-prueba')}/>
                    </form>
                    </div>
                </>
            );
        }
    
    
   
    console.log(tipo)

}