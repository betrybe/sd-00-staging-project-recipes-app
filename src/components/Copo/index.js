import React from 'react';

const iceLeft = () => (
  <g id="iceLeft">
    <path
      d=" M 46.751 81.733 L 27.662 84.671 L 16.662 65.618 L 35.751 62.68 L 46.751 81.733 Z "
      fill="rgb(187,222,251)"
    />
    <path
      d=" M 46.751 81.733 L 58.839 66.671 L 47.839 47.618 L 35.751 62.68 L 46.751 81.733 Z "
      fill="rgb(33,150,243)"
    />
    <path
      d=" M 16.662 65.618 L 28.751 50.556 L 47.839 47.618 L 35.751 62.68 L 16.662 65.618 Z "
      fill="rgb(144,202,249)"
    />
  </g>
);

const iceRight = () => (
  <g id="iceRight">
    <path
      d=" M 61.218 92.7 L 45.643 81.28 L 51.337 60.03 L 66.912 71.45 L 61.218 92.7 Z "
      fill="rgb(187,222,251)"
    />
    <path
      d=" M 61.218 92.7 L 80.416 90.598 L 86.11 69.347 L 66.912 71.45 L 61.218 92.7 Z "
      fill="rgb(33,150,243)"
    />
    <path
      d=" M 51.337 60.03 L 70.535 57.927 L 86.11 69.347 L 66.912 71.45 L 51.337 60.03 Z "
      fill="rgb(144,202,249)"
    />
  </g>
);

const Copo = () => (
  <div id="meals">
    <span>Page</span>
    <span>Not Found</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="rocksGlass"
      viewBox="-8.233 -8.233 122.466 122.466"
      height="300px"
    >
      <path
        d=" M 12.556 103 L 3 3 L 103 3 L 93.347 103 L 12.556 103 L 12.556 103 Z "
        fill="rgb(255,255,255)"
        vectorEffect="non-scaling-stroke"
        strokeWidth="5.616"
        stroke="rgb(70,70,70)"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit="4"
      />
      <g opacity="0.8">
        <path
          d=" M 12.251 56.089 L 93.751 56.089 L 88.851 98.111 L 17.351 98.111 L 12.251 56.089 Z "
          fill="rgb(147,72,3)"
        />
      </g>
      {iceLeft()}
      {iceRight()}
    </svg>
  </div>
);

export default Copo;
