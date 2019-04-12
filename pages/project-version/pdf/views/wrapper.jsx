import React from 'react';
import { readFileSync } from 'fs';
import path from 'path';

const Wrapper = ({ children, name, nonce }) => {
  const styles = readFileSync(path.join(__dirname, `../css/${name}.css`));

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <style dangerouslySetInnerHTML={{ __html: styles }} nonce={nonce} />
      </head>
      <body>
        { children }
      </body>
    </html>
  );
};

export default Wrapper;
