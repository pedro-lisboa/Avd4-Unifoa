import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface OptionsInterface {
  id: string,
  name: string,
  specialty?: string,
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  exampleText?: string;
  icon?: React.ComponentType<IconBaseProps>;
  options:  OptionsInterface[];
}

const Select: React.FC<InputProps> = ({ name, exampleText, icon: Icon, options, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <select
        defaultValue={defaultValue}
        ref={selectRef}
        {...props}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      >
      <option value="0" key={0} >{exampleText}</option>
       {options.map(option => (
        <option value={option.id} key={option.id} > {option.name} </option>)) }
       )}
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
