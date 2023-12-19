import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboarf';
import axios from '../services/root.service';
import { useEffect, useState } from 'react';
// import '../index.css';

// <Button variant="contained2" onClick={() => navigate('/vista-prueba')}>Ver Prueba</Button>

async function getMe(){
  const res = await axios.get('/users/me').finally();
  return res.data.data;
}


function App() {
  let aux = useAuth();
  // console.log(aux.user);
  if(aux.isAuthenticated == "false" || aux.user === ""){
    return(
      <div>
        <h1>Trabajando...</h1>
        navigate('/login');
      </div>
    );

  }else{

    const usuario = useAuth().user.roles[0].name;
    // console.log(usuario);
    if(usuario === "Examinador"){
      return(
        <>
        <Dashboard name={usuario} boton1={"CREAR PREGUNTA"} ruta="/vista-pruebas"/>
        </>
      );
    }

    if(usuario === "Postulante"){

      const [estado, setEstado] = useState([]);

      useEffect(()=>{
        getMe().then((data)=>{
            setEstado(data);
      });
      },[]);
      if (estado.estadoPostulacion == "Aprobado Teorico") {
        return(
          <>
          <Dashboard name={usuario} boton1={"PRUEBA RENDIDA"} ruta="/" estado={estado.estadoPostulacion}/>
          </>
        );  
      }else {
        return(
          <>
          <Dashboard name={usuario} boton1={"RENDIR PRUEBA"} ruta="/prueba" estado={estado.estadoPostulacion}/>
          </>
        );
      }
    }
  }
}

export default App;
