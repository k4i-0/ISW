import cookies from 'js-cookie';
import axios from '../services/root.service';
import { useForm } from 'react-hook-form';


async function envioPregunta(data){
    const token = cookies.get('jwt-auth');
    const datos = JSON.stringify(data);
    const res = await axios.post('/examinador/question',datos).finally();
    // console.log(res);
    return res; 
}

export default function Fromcrearpregunta(props){
    const {handleSubmit,register} = useForm();

    const onSubmit = (data) => {
        // console.log('Data:', data);
        envioPregunta(data).then(() => {
            window.location.reload();
        });
    };

    return(
        <div className='centeredForm'>
            <h2>Crear Preguntas</h2>
            <form onSubmit={handleSubmit(onSubmit)}className='centeredForm'>
                <label>Pregunta</label>
                <br />
                <input type="text" name='pregunta' {...register('pregunta')} className='centerinput'/>
                <br />
                <label className='centro'>Alternativa</label>
                <br />
                <input type="text" name="Alternativa[0]" {...register('Alternativa[0]')} className='centerinput'/>
                <br />
                <input type="text" name="Alternativa[1]" {...register('Alternativa[1]')} className='centerinput'/>
                <br />
                <input type="text" name="Alternativa[2]" {...register('Alternativa[2]')} className='centerinput'/>
                <br />
                <input type="text" name="Alternativa[3]" {...register('Alternativa[3]')} className='centerinput'/>
                <br />
                <label>Respuesta</label>
                <br />
                <input type="text" name="respuesta" {...register('respuesta')} className='centerinput'/>
                <br />
                <input type="submit" value="Enviar" />
            </form>
        </div>
    );

}