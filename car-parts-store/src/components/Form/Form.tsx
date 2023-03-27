import { PropsWithChildren } from "react";
import './Form.module.scss';

interface Props extends PropsWithChildren<any> {
  className?: string;
}

const Form = ({ className, children }: Props) => {
  return (
    <form className={className} onSubmit={e => e.preventDefault()}>
      {children}
    </form>
  )
}

export default Form;