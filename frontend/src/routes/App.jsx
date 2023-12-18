import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../index.css';

// <Button variant="contained2" onClick={() => navigate('/vista-prueba')}>Ver Prueba</Button>

function App() {
  const usuario = useAuth().user;
  const navigate = useNavigate();
  if(usuario.roles[0].name == 'Examinador'){
    const navigate = useNavigate();

    return(
      <>
       <div className="container2">
          <h1>Bienviendido {usuario.roles[0].name}</h1>
          <div className="buttons-container">
            <Button variant="contained2" onClick={() => navigate('/crear-prueba')}>
              Crear Prueba
            </Button>
          </div>
        </div>
      </>
    );
  }
  if(usuario.roles[0].name == 'Postulante'){
        return(
          <>
            <div className="container2">
              <h2>Bienvenido {usuario.roles[0].name}</h2>
              <div className="buttons-container">
                <Button  variant="contained2" onClick={() =>navigate('/prueba')}>Rendir Prueba</Button>
              </div>
            </div>
    
          </>
        );
  }
}

export default App;
