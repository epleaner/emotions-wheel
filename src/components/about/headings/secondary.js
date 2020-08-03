import React from 'react';

import Heading from '@components/shared/heading';
import Section from '@components/shared/section';

const SecondaryHeading = ({ body }) => (
  <Section mt={['10', '16']}>
    <Heading as='h2' fontSize={['3xl', '4xl', '5xl']}>
      {body}
    </Heading>
  </Section>
);

export default SecondaryHeading;
