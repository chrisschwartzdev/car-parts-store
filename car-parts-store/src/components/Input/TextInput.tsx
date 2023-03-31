import { createRef, HTMLInputTypeAttribute, useCallback, useEffect, useState } from "react";

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
  const inputRef = createRef<HTMLInputElement>();

  const handleChange = useCallback((val: string) => {
    setValue(val);
    onChange?.(val);
  }, [onChange]);

  useEffect(() => {
    if (autoFocus)
      inputRef?.current?.select();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus])

  return (
    <input ref={inputRef} className={className} placeholder={placeholder} type={type} onChange={e => handleChange(e.target.value)} value={value} autoFocus={autoFocus} />
  )
}

export default TextInput;