import cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

async function getPrueba(){
    const token = cookies.get('jwt-auth');
    const res = await axios.get('/users/teorico/prueba', token).then((response)=>{
       //console.log(response);
    });
    // const data = res.data.data;
    //console.log(res);
    return res;
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
    
    const onSubmit = (data) => {
        // console.log('Data:',data.Alternativa);
        setPrueba(data)
        .then(() => {
            navigate('/');
        })
    };
 

    return(
        <>
            <div>
                <h1>Prueba</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {preguntas.map((pregunta,index) => (
                    <div key={pregunta.id}>
                        <label>{pregunta.pregunta}</label>
                        {pregunta.Alternativa.map((alternativa) => (
                        <div key={alternativa.id}>
                            <label>{alternativa}</label>
                            <input type="checkbox" name={`Alternativa[${index}]`}  value={alternativa}{...register(`Alternativa[${index}]`)}  />
                        </div>
                        ))}
                        <br />
                    </div>
                    ))}
                    <button type="submit">Enviar</button>
                </form>
                <button onClick={()=>navigate('/') }></button>
            </div>
        </>
    )
}