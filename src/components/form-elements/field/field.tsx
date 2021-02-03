import React from 'react';

interface Props {
  label?: string;
  name: string;
  component: any;
}

const Field: React.FC<Props> = ({ label, component: Component }) => {
  return (
    <div>
      <div>{label}</div>
      <Component />
    </div>
  );
};

export default Field;
