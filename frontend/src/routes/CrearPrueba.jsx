import { useEffect, useState } from 'react';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cookies from 'js-cookie';

async function getTest(){
    const token = cookies.get('jwt-auth');
    const res =  await axios.get('/examinador/question/?timestamp=${Date.now()', token, { headers: { 'Cache-Control': 'no-cache' }});
    const data = res.data;
    // console.log(data);
    return data;
}

async function envioPregunta(data){
    const token = cookies.get('jwt-auth');
    const datos = JSON.stringify(data);
    const res = await axios.post('/examinador/question',datos);
    return res;
}

async function eliminarPregunta(id){
    const url = '/examinador/question/'+ id;
    const res = await axios.delete(url);
    if (res.status == 200){
        alert(res.data);
    }else {
        alert('Error al Eliminar Pregunta');
    }
    // console.log(res);
    window.location.reload();
    return
}


export default function crearPrueba(){
   
    
    const navigate = useNavigate();

    const [preguntas, setPreguntas] = useState([]);
    useEffect(()=>{
        getTest().then((data)=>{
            setPreguntas(data)
        });
    }, [])

    let lista;
    if (preguntas.length === 0){
        lista = <ul>Sin datos</ul>
    } else {
        lista = preguntas.map((pregunta )=>

            <li key={pregunta.id}>
                <p>{pregunta.id}</p>
                {pregunta.pregunta}
                <br/>
                {pregunta.Alternativa.map(alter =>
                    <ul key={alter.id}>
                        {alter}
                        <br />
                    </ul>)
                }
                <br />
                <p>Respuesta:</p>
                <ul>{pregunta.respuesta}</ul>
                <br />
                <button onClick={()=>{
                    const datos = pregunta;
                    navigate('/actualizar-pregunta', {state:datos})}
                    }>
                        edit</button>
                <button onClick={()=>eliminarPregunta(pregunta._id)}>Delete</button>
                <br />

                <br />
            </li>
        )
    
    }
    const {handleSubmit,register} = useForm();
    
    const onSubmit = (data) => {
        console.log('Data:', data);
        envioPregunta(data).then(() => {
            window.location.reload();
        });
    };
    
    return(
        <>
            <h1>Prueba Clase B</h1>
            <div>
                <div>
                    <h2>Ver Preguntas</h2>
                    <table>
                       <ol>{lista}</ol>
                    </table>
                </div>
            </div>
            <br />
            <div>
                <h2>Crear Preguntas</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Pregunta</label>
                    <br />
                    <input type="text" name='pregunta' {...register('pregunta')}/>
                    <br />
                    <label>Alternativa</label>
                    <br />
                    <input type="text" name="Alternativa[0]" {...register('Alternativa[0]')}/>
                    <br />
                    <input type="text" name="Alternativa[1]" {...register('Alternativa[1]')} />
                    <br />
                    <input type="text" name="Alternativa[2]" {...register('Alternativa[2]')} />
                    <br />
                    <input type="text" name="Alternativa[3]" {...register('Alternativa[3]')} />
                    <br />
                    <label>Respuesta</label>
                    <br />
                    <input type="text" name="respuesta" {...register('respuesta')} />
                    <br />
                    <input type="submit" value="Enviar" />
                </form>
            </div>
            <button onClick={()=>navigate('/')}>Volver</button>

        </>
    );
}