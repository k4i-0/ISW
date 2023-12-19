import { useEffect, useState } from 'react';
// import getPrueba from '../services/verpreguntas.service';
import axios from '../services/root.service';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

async function getTest(){
    const token = cookies.get('jwt-auth');
    const res =  await axios.get('/examinador/question/pruebas', token).finally();
    console.log(res.data);
    return res.data;
}

export default function Prueba() {
    const navigate = useNavigate();
    
    const [pruebas, setPruebas] = useState([]);

    useEffect(()=>{
        getTest().then((data)=>{
            setPruebas(data)
        });
    }, [])
    // console.log(pruebas);
    
     /*
            {prueba.Preguntas.map(pregunta=>{pregunta.pregunta})}
            {prueba.Preguntas.map(pregunta=>
                {pregunta.Alternativa.map(alter =>
                    <ul key={alter.id}>
                        {alter}
                        <br />
                    </ul>)
                })}
                */
    
    const lista = pruebas.map(prueba =>{
        <li key={prueba.id}>
            {prueba.estado}
        </li>
    });

    return(
        <>
            <h1>Pruebas</h1>
            {lista}
            <button onClick={()=>navigate('/')}>Volver</button>
        </>
    )};
