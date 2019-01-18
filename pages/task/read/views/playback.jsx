import React from 'react';
import Pil from './pil';

export default task => {

  if (task.model === 'pil') {
    return <Pil />;
  }

  return null;

};
