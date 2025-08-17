import React, { useEffect, useState } from 'react';
import { githubService } from '../services/githubService';
import './ApiTest.css';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [testResults, setTestResults] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getRateLimitPercentage = (remaining, limit) => {
    return Math.round((remaining / limit) * 100);
  };

  return (
    <div className="api-test-container">
      <div className="api-test-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>API Integration Status</h3>
        <span className="api-status">{apiStatus}</span>
        <button className="expand-button">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && testResults && (
        <div className="api-test-details">
          <div className="rate-limit-section">
            <h4>Rate Limits</h4>
            <div className="rate-limit-grid">
              <div className="rate-limit-item">
                <span className="rate-label">Core API:</span>
                <span className="rate-value">
                  {testResults.resources?.core?.remaining || 0} / {testResults.resources?.core?.limit || 0}
                </span>
                <div className="rate-bar">
                  <div 
                    className="rate-fill" 
                    style={{
                      width: `${getRateLimitPercentage(
                        testResults.resources?.core?.remaining || 0,
                        testResults.resources?.core?.limit || 1
                      )}%`,
                      backgroundColor: getRateLimitPercentage(
                        testResults.resources?.core?.remaining || 0,
                        testResults.resources?.core?.limit || 1
                      ) < 20 ? '#d73a49' : '#28a745'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="rate-limit-item">
                <span className="rate-label">Search API:</span>
                <span className="rate-value">
                  {testResults.resources?.search?.remaining || 0} / {testResults.resources?.search?.limit || 0}
                </span>
                <div className="rate-bar">
                  <div 
                    className="rate-fill" 
                    style={{
                      width: `${getRateLimitPercentage(
                        testResults.resources?.search?.remaining || 0,
                        testResults.resources?.search?.limit || 1
                      )}%`,
                      backgroundColor: getRateLimitPercentage(
                        testResults.resources?.search?.remaining || 0,
                        testResults.resources?.search?.limit || 1
                      ) < 20 ? '#d73a49' : '#28a745'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reset-info">
            <p><strong>Reset Time:</strong> {formatDate(testResults.resources?.core?.reset || 0)}</p>
          </div>
          
          <div className="api-features">
            <h4>Available Features</h4>
            <ul className="features-list">
              <li>✅ User Search with Advanced Filters</li>
              <li>✅ Repository Search</li>
              <li>✅ User Profile Details</li>
              <li>✅ Pagination Support</li>
              <li>✅ Rate Limit Monitoring</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 