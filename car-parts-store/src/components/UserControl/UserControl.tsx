import { useEffect, useState } from "react"
import useUserStore from "../../stores/userStore";
import { LoginData } from "../../types";

const LoginForm = () => {
  let [state, setState] = useState<LoginData>({});
  const login = useUserStore(state => state.login);

  return (
    <div className="login-form">
      <input placeholder="Username" value={state.username ?? ''} onChange={e => setState({ ...state, username: e.target.value })} />
      <input placeholder="Password" type="password" value={state.password ?? ''} onChange={e => setState({ ...state, password: e.target.value })} />
      <button onClick={() => login(state)}>Login</button>
    </div>
  )
}

export const UserControl = () => {
  const [open, setOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);

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
