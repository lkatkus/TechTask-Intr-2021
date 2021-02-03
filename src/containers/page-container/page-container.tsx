import React from 'react';

interface Props {
  title: string;
}

const PageContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default PageContainer;
