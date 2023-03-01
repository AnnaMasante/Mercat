import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: FC = () => {
  return <Spinner animation="border" variant="primary" />;
};

export default Loading;
