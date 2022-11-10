import React, { useEffect, useState } from 'react';

export default function CancelLink() {
  const [renderLink, setRenderLink] = useState(false);

  useEffect(() => {
    setRenderLink(process.browser && window.history.length > 1);
  });

  function onClick(e) {
    e.preventDefault();
    window.history.back();
  }

  return renderLink
    ? <a href="#" onClick={onClick}>Back</a>
    : null;
}
