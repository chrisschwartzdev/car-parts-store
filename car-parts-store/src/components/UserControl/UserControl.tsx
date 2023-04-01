import { useEffect, useState } from "react"
import { validateLogin } from "../../services/userService";
import useAppStore from "../../stores/appStore";
import useUserStore from "../../stores/userStore";
import { LoginRequest, RegisterRequest } from "../../types";
import { useSubscriptionModel } from "../../utils/SubscriptionManager";
import Form from "../Form/Form";
import TextInput from "../Input/TextInput";
import { LoadingSpinnerOrNode } from "../LoadingSpinner/LoadingSpinner";
import ToggleIconButton from "../Toggle.tsx/ToggleIconButton";
import styles from './UserControl.module.scss';

const RegisterForm = () => {
  const [state, setState] = useState<Partial<RegisterRequest>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, loadingState, subscribe, unsubscribe } = useUserStore();
  const { popModal } = useAppStore();

  const errorRef = useSubscriptionModel(popModal, subscribe, unsubscribe);
  const valid = validateLogin<RegisterRequest>(state);
  const loading = loadingState === "register";

  return (
    <Form className={styles.register}>
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} autoFocus />
      <div className="display-flex">
        <TextInput className="flex-grow" placeholder="Password" type={passwordVisible ? undefined : "password"} onChange={val => setState({ ...state, password: val })} />
        <ToggleIconButton type="button" className="flex-end" onChange={val => setPasswordVisible(val)}><i className="fa fa-eye" /></ToggleIconButton>
      </div>
      {errorRef.current && <p className="negative">{errorRef.current.message}</p>}
      <button disabled={!valid || loading} onClick={() => register(state as RegisterRequest)}><LoadingSpinnerOrNode loading={loading}>Submit</LoadingSpinnerOrNode></button>
    </Form>
  )
}

const LoginForm = () => {
  const [state, setState] = useState<LoginRequest>({ username: '', password: '' });
  const { login, loadingState } = useUserStore();
  const showModal = useAppStore(it => it.showModal);

  const valid = validateLogin<LoginRequest>(state);
  const loading = loadingState === "login";

  return (
    <Form className={styles.login}>
      <TextInput placeholder="Username" onChange={val => setState({ ...state, username: val })} autoFocus />
      <TextInput placeholder="Password" onChange={val => setState({ ...state, password: val })} type="password" />
      <button disabled={!valid || loading} onClick={() => login(state)}><LoadingSpinnerOrNode loading={loading}>Login</LoadingSpinnerOrNode></button>
      <button type="button" className='text-button' onClick={() => showModal({ component: <RegisterForm />, props: { title: "Register" } })}>New here? Register.</button>
    </Form>
  )
}

export const UserControl = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, loadingState } = useUserStore();

  useEffect(() => setOpen(false), [user])

  const inner = !user
    ? <LoginForm />
    : (
      <Form className={styles.login}>
        <button onClick={logout}><LoadingSpinnerOrNode loading={loadingState === "logout"}>Log Out</LoadingSpinnerOrNode></button>
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
