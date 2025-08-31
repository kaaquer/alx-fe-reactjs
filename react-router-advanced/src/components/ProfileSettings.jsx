import { useState } from 'react';

const ProfileSettings = ({ user }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    publicProfile: true,
    twoFactorAuth: false
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <p>This is a nested route for managing user settings.</p>
      
      <div className="settings-section">
        <h4>Notification Preferences</h4>
        <div className="setting-item">
          <div className="setting-info">
            <label>Email Notifications</label>
            <p>Receive updates and notifications via email</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange('emailNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label>Push Notifications</label>
            <p>Receive real-time notifications in your browser</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => handleSettingChange('pushNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4>Privacy Settings</h4>
        <div className="setting-item">
          <div className="setting-info">
            <label>Public Profile</label>
            <p>Allow other users to view your profile information</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.publicProfile}
              onChange={() => handleSettingChange('publicProfile')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label>Two-Factor Authentication</label>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleSettingChange('twoFactorAuth')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4>Account Information</h4>
        <div className="info-display">
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{user?.name || 'Not available'}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user?.email || 'Not available'}</span>
          </div>
          <div className="info-row">
            <span className="label">Member Since:</span>
            <span className="value">January 2024</span>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Reset to Default</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
