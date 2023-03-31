import { PropsWithChildren } from "react";
import { combineClasses } from "../../utils/utils";
import styles from './Form.module.scss';

interface Props extends PropsWithChildren<any> {
  className?: string;
  unstyled?: boolean;
}

const Form = ({ className, children, unstyled = false }: Props) => {
  return (
    <form className={combineClasses(unstyled ? undefined : styles.styled, className)} onSubmit={e => e.preventDefault()}>
      {children}
    </form>
  )
}

export default Form;