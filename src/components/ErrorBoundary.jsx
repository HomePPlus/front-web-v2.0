import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  // ... 나머지 코드는 동일
};

export default ErrorBoundary; 