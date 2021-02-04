import React from 'react';

import { Grid } from 'src/components';

import { PageTitle } from './components';

interface Props {
  title: string;
}

const PageContainer: React.FC<Props> = ({ title, children }) => (
  <Grid.Container p={20}>
    <Grid.Row mb={20}>
      <Grid.Col>
        <PageTitle>{title}</PageTitle>
      </Grid.Col>
    </Grid.Row>
    <Grid.Row>
      <Grid.Col>{children}</Grid.Col>
    </Grid.Row>
  </Grid.Container>
);

export default PageContainer;
