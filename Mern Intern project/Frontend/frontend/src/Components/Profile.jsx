import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Save, X, Phone, Mail, MapPin, Calendar, Award, CreditCard } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Apartment 4B, Bangalore, Karnataka - 560001',
    dateOfBirth: '1990-05-15',
    joinDate: '2023-01-15'
  });
  const [editData, setEditData] = useState({ ...profileData });

  const stats = [
    { label: 'Total Recharges', value: '47', icon: Phone },
    { label: 'Amount Spent', value: '₹12,450', icon: CreditCard },
    { label: 'Cashback Earned', value: '₹245', icon: Award },
    { label: 'Member Since', value: '2023', icon: Calendar }
  ];

  const recentActivity = [
    { type: 'Mobile Recharge', amount: '₹299', date: '2024-12-20', operator: 'Airtel' },
    { type: 'DTH Recharge', amount: '₹499', date: '2024-12-19', operator: 'Tata Sky' },
    { type: 'Electricity Bill', amount: '₹2,450', date: '2024-12-18', operator: 'BESCOM' },
    { type: 'Mobile Recharge', amount: '₹199', date: '2024-12-17', operator: 'Jio' }
  ];

  const [savedNumbers, setSavedNumbers] = useState([
    { number: '9876543210', operator: 'Airtel', label: 'Personal' },
    { number: '9876543211', operator: 'Jio', label: 'Work' },
    { number: '1234567890', operator: 'Tata Sky', label: 'Home DTH' }
  ]);

  const [newNumber, setNewNumber] = useState({
    number: '',
    operator: '',
    label: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleSavedRecharge = (item) => {
    // Navigate to mobile recharge with prefilled number via state
    navigate('/mobile-recharge', {
      state: {
        fromProfile: true,
        savedNumber: item.number,
        operator: item.operator,
        label: item.label
      }
    });
  };

  const handleAddNumber = () => {
    if (!newNumber.number.trim()) return;
    setSavedNumbers((prev) => [
      ...prev,
      {
        number: newNumber.number.trim(),
        operator: newNumber.operator.trim() || 'Unknown',
        label: newNumber.label.trim() || 'Saved'
      }
    ]);
    setNewNumber({ number: '', operator: '', label: '' });
  };

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <User size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 style={{ color: '#333', margin: 0 }}>Profile Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary h-12 px-6"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="btn btn-primary h-12 px-6 flex-1"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary h-12 px-6 flex-1"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: '#1f2937',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              {profileData.name.charAt(0)}
            </div>
            <h3 style={{ color: '#333', marginBottom: '5px' }}>{profileData.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Premium Member</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 flex items-center gap-3 h-14">
                  <User size={20} className="text-gray-600" />
                  <span className="text-lg text-gray-800">{profileData.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 flex items-center gap-3 h-14">
                  <Mail size={20} className="text-gray-600" />
                  <span className="text-lg text-gray-800">{profileData.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 flex items-center gap-3 h-14">
                  <Phone size={20} className="text-gray-600" />
                  <span className="text-lg text-gray-800">{profileData.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                  className="input text-lg min-h-[100px] resize-none"
                  rows="4"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 min-h-[100px]">
                  <MapPin size={20} className="text-gray-600 mt-1" />
                  <span className="text-lg text-gray-800 leading-relaxed">{profileData.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editData.dateOfBirth}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 flex items-center gap-3 h-14">
                  <Calendar size={20} className="text-gray-600" />
                  <span className="text-lg text-gray-800">{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div>
          {/* Stats */}
          <div className="card mb-3">
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Account Statistics</h3>
            <div className="grid grid-2 gap-2">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <Icon size={24} style={{ color: '#374151', marginBottom: '10px' }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card mb-3">
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Activity</h3>
            {recentActivity.map((activity, index) => (
              <div key={index} className="transaction-item">
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>
                    {activity.type}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {activity.operator} • {activity.date}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Saved Numbers */}
          <div className="card">
            <h3 style={{ marginBottom: '16px', color: '#333' }}>Saved Numbers</h3>

            {savedNumbers.map((item, index) => (
              <div key={index} className="transaction-item">
                <div>
                  <div style={{ fontWeight: '500', color: '#333', fontFamily: 'monospace' }}>
                    {item.number}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {item.operator} • {item.label}
                  </div>
                </div>
                <button
                  onClick={() => handleSavedRecharge(item)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Recharge
                </button>
              </div>
            ))}

            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="tel"
                  placeholder="Mobile / DTH number"
                  value={newNumber.number}
                  onChange={(e) =>
                    setNewNumber((prev) => ({ ...prev, number: e.target.value }))
                  }
                  className="input h-10 text-sm"
                />
                <input
                  type="text"
                  placeholder="Operator"
                  value={newNumber.operator}
                  onChange={(e) =>
                    setNewNumber((prev) => ({ ...prev, operator: e.target.value }))
                  }
                  className="input h-10 text-sm"
                />
                <input
                  type="text"
                  placeholder="Label (Home, Work...)"
                  value={newNumber.label}
                  onChange={(e) =>
                    setNewNumber((prev) => ({ ...prev, label: e.target.value }))
                  }
                  className="input h-10 text-sm"
                />
              </div>
              <button
                onClick={handleAddNumber}
                className="btn w-100 mt-1"
                style={{ padding: '8px' }}
              >
                Add New Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;