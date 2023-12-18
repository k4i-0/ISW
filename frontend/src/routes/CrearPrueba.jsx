import { useEffect, useState } from 'react';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cookies from 'js-cookie';
import '../index.css';
import { Button } from '@mui/material';


async function getTest(){
    const token = cookies.get('jwt-auth');
    const res =  await axios.get('/examinador/question/', token).finally();
    const data = res.data;
    // console.log(data);
    return data;
}

async function envioPregunta(data){
    const token = cookies.get('jwt-auth');
    const datos = JSON.stringify(data);
    const res = await axios.post('/examinador/question',datos).finally();
    console.log(res);
    return res;
}

async function eliminarPregunta(id){
    const url = '/examinador/question/'+ id;
    const res = await axios.delete(url).finally();
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

            <li key={pregunta.id} className="pregunta-item">
                <div className="pregunta-respuestas">
                    <div className="pregunta">
                        <p>{pregunta.id}</p>
                        {pregunta.pregunta}
                    </div>
                </div>
                <br/>
                <div className="respuestas">
                    {pregunta.Alternativa.map((alter) => (
                    <div key={alter.id}>{alter}</div>
                        ))}
                    <p>Respuesta:</p>
                    <div>{pregunta.respuesta}</div>
                </div>
                <div className="botones">
                    <Button
                    onClick={() => {
                        const datos = pregunta;
                        navigate('/actualizar-pregunta', { state: datos });
                        }}
                        >
                            Editar
                    </Button>
                    <Button onClick={() => eliminarPregunta(pregunta._id)}>Eliminar</Button>
                </div>

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
        <div >
            <div className='container2'>
                <h1>Prueba Clase B</h1>
                <div>
                    <h2>Ver Preguntas</h2>
                    <table className="lista-preguntas">
                       <ol className="lista-preguntas" >{lista}</ol>
                    </table>
                </div>
            </div>
            <br />
            <div className='container2'>
                <h2>Crear Preguntas</h2>
                <form className="crear-pregunta" onSubmit={handleSubmit(onSubmit)}>
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
            <Button onClick={()=>navigate('/')}>Volver</Button>

        </div>
    );
}