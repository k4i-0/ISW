import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function App() {
  const user = useAuth();
  const navigate = useNavigate();
  console.log(user);

  if(user.user.roles[0].name == 'Examinador'){
    const navigate = useNavigate();

    return(
      <>
        <h1>Bienviendido {user.user.roles[0].name} </h1>
        <button onClick={()=>navigate('/vista-prueba')}>Ver Prueba</button>
        <button onClick={()=>navigate('/crear-prueba')}>Crear Prueba</button>

      </>
    );
  }
  if(user.user.roles[0].name == 'Postulante'){
    return(
      <>
      <h1>Bienvenido {user.user.roles[0].name}</h1>
      <button onClick={() =>navigate('/prueba')}>Rendir Prueba</button>

      </>
    );
  }
}

export default App;
