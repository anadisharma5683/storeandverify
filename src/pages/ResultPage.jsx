import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  return (
    <div className="text-center mt-10">
      {result === 'new' && <h2>🎉 Welcome, New User!</h2>}
{result === 'old' && <h2>👋 Welcome back, Old User!</h2>}
{result === 'wrong' && <h2>❌ Wrong Password</h2>}
{result === 'error' && <h2>⚠️ {location.state?.message || 'Something went wrong'}</h2>}


    </div>
  );
};

export default ResultPage;
