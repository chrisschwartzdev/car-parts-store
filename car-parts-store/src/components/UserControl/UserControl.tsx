import { useState } from "react"

interface LoginData {
  username?: string;
  password?: string;
}

const LoginForm = () => {
  let [state, setState] = useState<LoginData>({});

  return (
    <div className="login-form">
      <input placeholder="Username" value={state.username} onChange={e => setState({ ...state, username: e.target.value })} />
      <input placeholder="Password" type="password" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} />
      <button>Login</button>
    </div>
  )
}

export const UserControl = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button className="icon-btn fa fa-user" onClick={() => setOpen(!open)} />
      {open && <LoginForm />}
    </div>
  )
}
