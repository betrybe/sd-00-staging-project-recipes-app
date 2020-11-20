import React from 'react';
// import { Link } from 'react-router-dom';

function Login() {
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [inputValues, setInputValues] = useState({ email: '', password: '' });
  // const { email, password } = inputValues;

  // useEffect(() => {
  //   const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  //   const checkPassword = 6;
  //   if (password.length > checkPassword && checkEmail) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [inputValues]);

  return (
    <div>
      <form>
        <h1>Login</h1>
        {/* <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
          required
          value={email}
          onChange={({ target }) => setInputValues({ ...inputValues, email: target.value })}
        />
        <br />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
          value={password}
          onChange={({ target }) => setInputValues({ ...inputValues, password: target.value })}
        />
        <br />
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={isDisabled}
            // onClick={saveEmail}
          >
            Entrar
          </button>
        </Link> */}
      </form>
    </div>
  );
}

export default Login;
