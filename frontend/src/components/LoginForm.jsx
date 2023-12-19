import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='centeredForm' >
      <img src="" alt="Icono" className='centerinput'/>
      <div className="form-group">
        <input
          name="email"
          type="email"
          {...register('email', { required: true })} className='centerinput'
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          {...register('password', { required: true })} className='centerinput'
        />
      </div>
      {errors.exampleRequired && <span>This field is required</span>}
      <br />
      <div className="form-group">
        <input type="submit" value="Ingresar" className="submit-button"/>
      </div>
    </form>
  );
}

export default LoginForm;
