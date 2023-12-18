import { useEffect, useState } from 'react';
import axios from '../services/root.service';
import cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

async function getPrueba(){
    const token = cookies.get('jwt-auth');
    const res =  await axios.get('/users/teorico/prueba', token).finally();
    const data = res.data.data;
    console.log(res);
    return data;
}

async function setPrueba(data){
    const token = cookies.get('jwt-auth');
    const res = await axios.post('/users/teorico/miprueba', data.Alternativa).finally();
    if (res.data.data == "Reprobado") {
        alert("Reprobado")

    } else {
        if (res.data.data == "Aprobado") {
            alert("Aprobado")

        }
    }
    console.log(res)
    return res.data;
}


export default function rendirPrueba(){

    const [preguntas, setPreguntas] = useState([]);
    //const [alternativa, setAlternativa] = useState([]);
    const navigate = useNavigate();
    
    const {handleSubmit,register} = useForm();
    /*
    useEffect(()=>{
        getPrueba().then((data)=>{
            setPreguntas(data)
        });
    }, [])

    useEffect(()=>{
        (preguntas)=>{
            setAlternativa(preguntas)
        };
    }, [])
    */
    useEffect(() => {
        getPrueba().then((data) => {
          setPreguntas(data);
        });
    }, []);
 
    
    const onSubmit = (data) => {
        console.log('Data:',data.Alternativa);
        setPrueba(data)
        .then(() => {
            navigate('/');
        })
    };

    return(
        <>
            <div className="container6">
                <h1>Prueba</h1>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
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