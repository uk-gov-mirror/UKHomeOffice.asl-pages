import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

const OverflowWrapper = ({ children }) => {

  const ref = useRef(null);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const scroll = () => {
    // show left shadow if user has scrolled at all
    const left = ref.current.scrollLeft > 0;
    // show right shadow if scroll distance is less than the full width
    const right = ref.current.scrollLeft + ref.current.offsetWidth < ref.current.scrollWidth;
    setOverflow({ left, right });
  };

  // update once on initialisation
  useEffect(scroll, []);

  return <div className={classnames('overflow-wrapper', { 'overflow-left': overflow.left, 'overflow-right': overflow.right })}>
    <div className="overflow-inner" onScroll={scroll} ref={ref}>
      { children }
    </div>
  </div>;
};

export default OverflowWrapper;
