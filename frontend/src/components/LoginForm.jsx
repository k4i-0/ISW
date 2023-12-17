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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="email"
        {...register('email', { required: true })}
      />
      <br/>
      <input
        type="password"
        name="password"
        {...register('password', { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <br />
      <input type="submit" value="Ingresar" />
    </form>
  );
}

export default LoginForm;
