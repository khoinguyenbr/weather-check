import * as React from 'react';

const Loading: React.FC = () => {
  return (
    <span className="spinner-border spinner-border-sm text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Loading;
