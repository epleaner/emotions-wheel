import { NextPage } from 'next';
import { Flex, Link } from 'theme-ui';

const About: NextPage = () => (
  <>
    <Flex sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
      <h1>A tool for checking in with yourself.</h1>
    </Flex>
    <Flex sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
      <h2>
        Inspired by{' '}
        <Link
          target='_blank'
          rel='nofollow noreferrer'
          href='https://www.thejuntoinstitute.com'
        >
          The Junto Institute's
        </Link>{' '}
        <Link
          target='_blank'
          rel='nofollow noreferrer'
          href='https://www.thejuntoinstitute.com/blog/the-junto-emotion-wheel-why-and-how-we-use-it'
        >
          emotion wheel
        </Link>
      </h2>
    </Flex>
  </>
);

export default About;
