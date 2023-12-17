import { useEffect, useState } from 'react';
// import getPrueba from '../services/verpreguntas.service';


export default function Prueba() {
    /*
    const [preguntas, setPreguntas] = useState([]);

    useEffect(()=>{
        getPrueba().then((data)=>setPreguntas(data));
    }, [])

    const lista = preguntas.map(pregunta =>
                <li key={pregunta.id}>
                    {pregunta.pregunta}
                    <br/>
                    {pregunta.Alternativa.map(alter =>
                        <li key={alter.id}>
                            {alter}
                            <br />
                        </li>)
                    }
                    <br />
                </li>
    );*/

    return(
        <>
            <h1>Preguntas Creadas</h1>
            <table>
            </table>
        </>
    );
}




