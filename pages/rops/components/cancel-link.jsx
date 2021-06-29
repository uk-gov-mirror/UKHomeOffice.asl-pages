import React from 'react';

export default function CancelLink() {
  if (typeof window === 'undefined' || window.history.length <= 1) {
    return null;
  }

  function onClick(e) {
    e.preventDefault();
    window.history.back();
  }

  return <a href="#" onClick={onClick}>Back</a>;
}
