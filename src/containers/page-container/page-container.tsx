import React from 'react';

import { Text } from 'src/core';

import { Grid } from 'src/components';

interface Props {
  title: string;
}

const PageContainer: React.FC<Props> = ({ title, children }) => (
  <Grid.Container p={20}>
    <Grid.Container maxWidth={1200}>
      <Grid.Row mb={20}>
        <Grid.Col>
          <Text.Heading1>{title}</Text.Heading1>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>{children}</Grid.Col>
      </Grid.Row>
    </Grid.Container>
  </Grid.Container>
);

export default PageContainer;
