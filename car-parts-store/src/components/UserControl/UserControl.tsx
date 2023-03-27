import { useEffect, useState } from "react"
import useAppStore from "../../stores/appStore";
import useUserStore from "../../stores/userStore";
import { LoginRequest, RegisterRequest } from "../../types";
import TextInput from "../Input/TextInput";

const validateLogin = <T extends RegisterRequest | LoginRequest>({ username, password }: Partial<T>) => {
  if ((username || '').length < 4)
    return false;
  if ((password || '').length < 6)
    return false;

  return true;
}

const RegisterForm = () => {
  const [state, setState] = useState<Partial<RegisterRequest>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const register = useUserStore(it => it.register);
  const popModal = useAppStore(it => it.popModal);
  const registerSent = useUserStore(it => it.registerSent);

  useEffect(() => {
    if (registerSent)
      popModal();
  }, [popModal, registerSent])

  const valid = validateLogin<RegisterRequest>(state);

  return (
    <div className='register-form'>
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} />
      <div className="display-flex">
        <TextInput className="flex-grow" placeholder="Password" type={passwordVisible ? undefined : "password"} onChange={val => setState({ ...state, password: val })} />
        <button className="icon-btn flex-end" onClick={() => setPasswordVisible(!passwordVisible)}><i className="fa fa-eye" /></button>
      </div>
      <button disabled={!valid} onClick={() => register(state as RegisterRequest)}>Submit</button>
    </div>
  )
}

const LoginForm = () => {
  const [state, setState] = useState<LoginRequest>({ username: '', password: '' });
  const login = useUserStore(it => it.login);
  const showModal = useAppStore(it => it.showModal);

  const valid = validateLogin<LoginRequest>(state);

  return (
    <div className="login-form">
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} />
      <TextInput placeholder="Password" onChange={val => setState({ ...state, password: val })} type="password" />
      <button disabled={!valid} onClick={() => login(state)}>Login</button>
      <button className='text-button' onClick={() => showModal({ component: <RegisterForm />, props: { title: "Register" } })}>New here? Register.</button>
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
