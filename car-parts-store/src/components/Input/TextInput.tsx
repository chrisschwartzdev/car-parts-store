import { HTMLInputTypeAttribute, useCallback, useState } from "react";

interface TextInputProps {
  initialValue?: string;
  placeholder?: string
  onChange?: (val: string) => void;
  type?: HTMLInputTypeAttribute;
  className?: string;
  autoFocus?: boolean;
}

const TextInput = ({ initialValue, placeholder, onChange, type, className, autoFocus }: TextInputProps) => {
  const [value, setValue] = useState(initialValue ?? '');

  const handleChange = useCallback((val: string) => {
    setValue(val);
    onChange?.(val);
  }, [onChange]);

  return (
    <input className={className} placeholder={placeholder} type={type} onChange={e => handleChange(e.target.value)} value={value} autoFocus={autoFocus} />
  )
}

export default TextInput;