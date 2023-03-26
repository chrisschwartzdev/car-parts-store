import { useEffect, useState } from "react"
import useAppStore from "../../stores/appStore";
import useUserStore from "../../stores/userStore";
import { LoginRequest, RegisterRequest } from "../../types";

const RegisterForm = () => {
  const [state, setState] = useState<Partial<RegisterRequest>>();
  const register = useUserStore(it => it.register);
  const popModal = useAppStore(it => it.popModal);
  const registerSent = useUserStore(it => it.registerSent);

  useEffect(() => {
    if (registerSent)
      popModal();
  }, [popModal, registerSent])

  const validate = () => {
    if ((state?.username || '').length < 4)
      return false;
    if ((state?.password || '').length < 6)
      return false;

    return true;
  }

  const valid = validate();

  return (
    <div className='register-form'>
      <input placeholder="Username" onChange={e => setState({ ...state, username: e.target.value })} />
      <input placeholder="Password" onChange={e => setState({ ...state, password: e.target.value })} />
      <button disabled={!valid} onClick={() => register(state as RegisterRequest)}>Submit</button>
    </div>
  )
}

const LoginForm = () => {
  const [state, setState] = useState<LoginRequest>({ username: '', password: '' });
  const login = useUserStore(it => it.login);
  const showModal = useAppStore(it => it.showModal);

  return (
    <div className="login-form">
      <input placeholder="Username" value={state.username ?? ''} onChange={e => setState({ ...state, username: e.target.value })} />
      <input placeholder="Password" type="password" value={state.password ?? ''} onChange={e => setState({ ...state, password: e.target.value })} />
      <button onClick={() => login(state)}>Login</button>
      <button className='text-button' onClick={() => showModal(<RegisterForm />)}>New here? Register.</button>
    </div>
  )
}

export const UserControl = () => {
  const [open, setOpen] = useState(false);
  const user = useUserStore(it => it.user);
  const logout = useUserStore(it => it.logout);

  useEffect(() => setOpen(false), [user])

  const inner = !user
    ? <LoginForm />
    : (
      <div className="login-form">
        <button onClick={() => logout()}>Log Out</button>
      </div>
    )

  return (
    <div>
      <span>{!!user ? `Hello ${user.username}!` : 'Welcome, please log in.'}</span>
      <button className="icon-btn fa fa-user" onClick={() => setOpen(!open)} />
      {open && inner}
    </div>
  )
}
