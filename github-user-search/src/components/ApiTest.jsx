import React, { useEffect, useState } from 'react';
import { githubService } from '../services/githubService';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        const result = await githubService.testApiConnection();
        setApiStatus('✅ API Connection Successful');
        setTestResults(result);
      } catch (error) {
        setApiStatus('❌ API Connection Failed');
        console.error('API test failed:', error);
      }
    };

    testApi();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      background: 'white', 
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3>API Integration Test</h3>
      <p><strong>Status:</strong> {apiStatus}</p>
      {testResults && (
        <div>
          <p><strong>Rate Limit:</strong> {testResults.resources?.core?.remaining || 'N/A'} / {testResults.resources?.core?.limit || 'N/A'}</p>
          <p><strong>Reset Time:</strong> {new Date((testResults.resources?.core?.reset || 0) * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 