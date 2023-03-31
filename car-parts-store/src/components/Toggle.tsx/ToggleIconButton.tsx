import { PropsWithChildren, useCallback, useState } from 'react';
import { combineClasses } from '../../utils/utils';
import styles from './Toggle.module.scss';

interface Props extends PropsWithChildren<any> {
  className?: string;
  initialValue?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  onChange?: (val: boolean) => void;
}

const ToggleIconButton = ({ className, initialValue, type, onChange, children }: Props) => {
  const [active, setActive] = useState(initialValue);

  const handleClick = useCallback(() => {
    const value = !active;
    setActive(value);
    onChange?.(value);
  }, [active, onChange]);

  return (
    <button type={type} className={combineClasses("icon-btn", styles.toggleIconButton, className)} onClick={handleClick} data-active={active ? "true" : undefined}>{children}</button>
  )
}

export default ToggleIconButton;