import React, { FunctionComponent } from 'react';
import './styles.scss';

const Form: FunctionComponent<FormProps> = ({ children, onsubmit }) => {
  return (
    <form
      className="bp-form"
      action="/subscribe"
      method="post"
      id="subscribe"
      onSubmit={onsubmit}
      noValidate
    >
      {children}
    </form>
  );
};

export default Form;

interface FormProps {
  children: any;
  onsubmit: any;
}
