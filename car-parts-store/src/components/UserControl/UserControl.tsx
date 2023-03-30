import { useEffect, useState } from "react"
import useAppStore from "../../stores/appStore";
import useUserStore, { validateLogin } from "../../stores/userStore";
import { LoginRequest, RegisterRequest } from "../../types";
import Form from "../Form/Form";
import TextInput from "../Input/TextInput";
import ToggleIconButton from "../Toggle.tsx/ToggleIconButton";
import styles from './UserControl.module.scss';

const RegisterForm = () => {
  const [state, setState] = useState<Partial<RegisterRequest>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, registerSent } = useUserStore(it => ({ register: it.register, registerSent: it.registerSent }));
  const popModal = useAppStore(it => it.popModal);

  useEffect(() => {
    if (registerSent)
      popModal();
  }, [popModal, registerSent])

  const valid = validateLogin<RegisterRequest>(state);

  return (
    <Form className={styles.register}>
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} autoFocus />
      <div className="display-flex">
        <TextInput className="flex-grow" placeholder="Password" type={passwordVisible ? undefined : "password"} onChange={val => setState({ ...state, password: val })} />
        <ToggleIconButton type="button" className="flex-end" onChange={val => setPasswordVisible(val)}><i className="fa fa-eye" /></ToggleIconButton>
      </div>
      <button disabled={!valid} onClick={() => register(state as RegisterRequest)}>Submit</button>
    </Form>
  )
}

const LoginForm = () => {
  const [state, setState] = useState<LoginRequest>({ username: '', password: '' });
  const login = useUserStore(it => it.login);
  const showModal = useAppStore(it => it.showModal);

  const valid = validateLogin<LoginRequest>(state);

  return (
    <Form className={styles.login}>
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} autoFocus />
      <TextInput placeholder="Password" onChange={val => setState({ ...state, password: val })} type="password" />
      <button disabled={!valid} onClick={() => login(state)}>Login</button>
      <button type="button" className='text-button' onClick={() => showModal({ component: <RegisterForm />, props: { title: "Register" } })}>New here? Register.</button>
    </Form>
  )
}

export const UserControl = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useUserStore(it => ({ user: it.user, logout: it.logout }));

  useEffect(() => setOpen(false), [user])

  const inner = !user
    ? <LoginForm />
    : (
      <Form className={styles.login}>
        <button onClick={() => logout()}>Log Out</button>
      </Form>
    )

  return (
    <div>
      <span>{!!user ? `Hello, ${user.username}!` : 'Welcome, please log in.'}</span>
      <button className="icon-btn fa fa-user" onClick={() => setOpen(!open)} />
      {open && inner}
    </div>
  )
}
