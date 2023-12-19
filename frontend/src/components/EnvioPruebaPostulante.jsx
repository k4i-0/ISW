import cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

async function getPrueba(){
    const token = cookies.get('jwt-auth');
    const res = await axios.get('/users/teorico/prueba', token).finally();
    //const data = res.data.data;
    //console.log(res);
    return res.data.data
}

async function setPrueba(data) {
  const token = cookies.get('jwt-auth');
  const res = await axios.post('/users/teorico/miprueba', data.Alternativa).finally();

  if (res.data.data == "Reprobado") {
    alert("Reprobado");
  } else {
    if (res.data.data == "Aprobado") {
      alert("Aprobado");
    }
  }

  return res.data;
}


export default function rendirPrueba() {
    const [preguntas, setPreguntas] = useState([]);
    const navigate = useNavigate();

    const {
        handleSubmit,
        register
    } = useForm();

    useEffect(() => {
        getPrueba().then((data) => {
          setPreguntas(data);
        });
    }, []);
    console.log(preguntas);
    
    
    const onSubmit = (data) => {
        // console.log('Data:',data.Alternativa);
        setPrueba(data)
        .then(() => {
            navigate('/');
        })
    };
 

    return(
        <>
            <div className='centeredForm'>
                <h1>Prueba</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='centeredForm'>
                    <table>
                        {preguntas.map((pregunta,index) => (
                        <tr key={pregunta.id}>
                            <h3>{pregunta.pregunta}</h3>
                            {pregunta.Alternativa.map((alternativa) => (
                            <p key={alternativa.id}>
                                {alternativa}
                                <input type="checkbox" name={`Alternativa[${index}]`}  value={alternativa}{...register(`Alternativa[${index}]`)}  />
                            </p>
                            ))}
                        </tr>
                        ))}
                    </table>
                    <button type="submit">Enviar</button>
                </form>
                <button onClick={()=>navigate('/') }>VOLVER</button>
            </div>
        </>
    );
}