import { HTMLInputTypeAttribute, useCallback, useState } from "react";

interface TextInputProps {
  initialValue?: string;
  placeholder?: string
  onChange?: (val: string) => void;
  type?: HTMLInputTypeAttribute;
}

const TextInput = ({ initialValue, placeholder, onChange, type }: TextInputProps) => {
  const [value, setValue] = useState(initialValue ?? '');

  const handleChange = useCallback((val: string) => {
    setValue(val);
    onChange?.(val);
  }, [onChange]);

  return (
    <input placeholder={placeholder} type={type} onChange={e => handleChange(e.target.value)} value={value} />
  )
}

export default TextInput;