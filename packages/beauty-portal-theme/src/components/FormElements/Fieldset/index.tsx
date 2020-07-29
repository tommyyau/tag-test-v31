import React, { FunctionComponent } from 'react';
import '../styles.scss';

const Fieldset: FunctionComponent<FieldsetInterface> = ({
  children,
  legend,
}) => {
  return (
    <fieldset className="bp-form_fieldset">
      <legend className="srOnly">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;

interface FieldsetInterface {
  legend: string;
  children: any;
}
