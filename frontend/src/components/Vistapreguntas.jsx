import axios from '../services/root.service';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

async function getTest(){
    const token = cookies.get('jwt-auth');
    const res =  await axios.get('/examinador/question/', token).finally();
    const data = res.data;
    // console.log(data);
    return data;
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

export default function VistaPreguntas(props){
    const navigate = useNavigate();

    const [preguntas, setPreguntas] = useState([]);
    useEffect(()=>{
        getTest().then((data)=>{
            setPreguntas(data)
        });
    }, [])

    let lista;
    if (preguntas.length === 0){
        lista = <p>Sin datos</p>
    } else {
        lista = preguntas.map((pregunta )=>
            <table>
                <tr key={pregunta.id} >
                    <td>
                    <h3>{pregunta.pregunta}</h3>
                    {pregunta.Alternativa.map((alter) => (
                        <p key={alter.id}>
                            {alter}</p>
                        ))}
                    <p>{pregunta.respuesta}</p>
                    </td>
                    <td>
                    <button
                        onClick={() => {
                            const datos = pregunta;
                            navigate('/actualizar-pregunta', { state: datos });
                            }}
                            >
                                Editar
                        </button>
                        <button onClick={() => eliminarPregunta(pregunta._id)}>Eliminar</button>
                    </td>
                </tr>
            </table>
        )
    }

    return (
        <div>
            <h1>Preguntas</h1>
            {lista}
        </div>
    );
}