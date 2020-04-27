import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';
import './Auth.css';

const createAuthActions = (actions, isLogin) => {
  const { onEnterEmail, onEnterPassword } = actions[isLogin ? 'login' : 'signup'];
  return {
    handleSubmit: (event) => {
      event.preventDefault();
      isLogin ? actions.handleLogin() : actions.handleSignup();
    },
    onEnterEmail,
    onEnterPassword
  };
};

const Login = ({ match, location, actions, state, isLogin}) => {
  const { handleSubmit, onEnterEmail, onEnterPassword } = createAuthActions(actions, isLogin);
  const { email, password } = state[isLogin ? 'login' : 'signup'];

  return (
    <div className="container-auth">
      <form className="form-auth">
        <h2>{`HyperChat${isLogin ? '' : '- Sign Up'}`}</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          oninput={(e) => onEnterEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          oninput={(e) => onEnterPassword(e.target.value)}
          required
        />
        <input type="submit" onclick={handleSubmit} value={`${isLogin ? 'Login' : 'Sign up'}`} />
        <Link to={`${isLogin ? '/signup' : '/login'}`}>{isLogin ? 'Sign Up' : 'Login'}</Link>
      </form>
    </div>
  );
};

export default Login;
