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

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<TextAreaProps> = ({ name, icon: Icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <textarea
        defaultValue={defaultValue}
        ref={textAreaRef}
        {...props}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        rows= {4} 
        cols= {50}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
