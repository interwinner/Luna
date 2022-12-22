import { useEffect } from 'react';
import { useLocation } from 'react-router';
import usePrevious from './hooks/usePrevious';

export default function ScrollToTop() {
  const location = useLocation();
  const prevVal = usePrevious(location.pathname);
  useEffect(() => {
    if (location && Object.keys(location).length !== 0) {
      if (location && location.pathname !== prevVal) {
        window.scrollTo(0, 0);
      }
    }
  });
  return null;
}
