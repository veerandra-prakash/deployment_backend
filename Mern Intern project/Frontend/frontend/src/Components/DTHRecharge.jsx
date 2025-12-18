import React, { useState } from 'react';
import { Tv, Check, Satellite } from 'lucide-react';

const DTHRecharge = () => {
  const [formData, setFormData] = useState({
    subscriberId: '',
    operator: '',
    amount: '',
    customerInfo: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchingInfo, setFetchingInfo] = useState(false);

  const dthOperators = [
    'Tata Sky', 'Airtel Digital TV', 'Dish TV', 'Videocon D2H', 'Sun Direct', 'DD Free Dish'
  ];

  const popularPlans = [
    { amount: 299, validity: '30 days', channels: '200+', description: 'Basic Pack' },
    { amount: 499, validity: '30 days', channels: '300+', description: 'Family Pack' },
    { amount: 699, validity: '30 days', channels: '400+', description: 'Premium Pack' },
    { amount: 999, validity: '30 days', channels: '500+', description: 'Ultimate Pack' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchCustomerInfo = async () => {
    if (!formData.subscriberId || !formData.operator) {
      alert('Please enter Subscriber ID and select operator');
      return;
    }

    setFetchingInfo(true);
    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        customerInfo: {
          name: 'John Doe',
          address: '123 Main Street, City',
          balance: '₹150.50',
          lastRecharge: '15 Dec 2024',
          status: 'Active'
        }
      }));
      setFetchingInfo(false);
    }, 1500);
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    if (!formData.subscriberId || !formData.operator || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <Tv size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">DTH Recharge</h1>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <Check size={20} />
          DTH recharge successful! Your account has been recharged with ₹{formData.amount}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recharge Details</h3>
          <form onSubmit={handleRecharge} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Subscriber ID / Customer ID *</label>
              <input
                type="text"
                name="subscriberId"
                value={formData.subscriberId}
                onChange={handleInputChange}
                className="input text-lg h-14"
                placeholder="Enter your subscriber ID"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">DTH Operator *</label>
              <select
                name="operator"
                value={formData.operator}
                onChange={handleInputChange}
                className="input text-lg h-14"
                required
              >
                <option value="">Select DTH Operator</option>
                {dthOperators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={fetchCustomerInfo}
              className="btn btn-secondary w-full h-14 text-lg font-semibold"
              disabled={fetchingInfo}
            >
              {fetchingInfo ? 'Fetching Info...' : 'Fetch Customer Info'}
            </button>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Recharge Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="input text-lg h-14"
                placeholder="Enter recharge amount"
                min="100"
                max="10000"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Recharge Now'}
            </button>
          </form>
        </div>

        <div className="card">
          {formData.customerInfo ? (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Satellite size={24} />
                Customer Information
              </h3>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Name:</strong> {formData.customerInfo.name}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Address:</strong> {formData.customerInfo.address}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Current Balance:</strong> {formData.customerInfo.balance}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Last Recharge:</strong> {formData.customerInfo.lastRecharge}
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span style={{ 
                    color: formData.customerInfo.status === 'Active' ? '#28a745' : '#dc3545',
                    marginLeft: '5px'
                  }}>
                    {formData.customerInfo.status}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Popular Plans</h3>
            </div>
          )}

          <div className="grid grid-2 gap-2">
            {popularPlans.map((plan, index) => (
              <div
                key={index}
                className="quick-amount"
                onClick={() => setFormData(prev => ({ ...prev, amount: plan.amount.toString() }))}
                style={{
                  background: formData.amount === plan.amount.toString() ? '#1f2937' : '#f8f9fa',
                  color: formData.amount === plan.amount.toString() ? 'white' : '#333',
                  border: formData.amount === plan.amount.toString() ? '2px solid #1f2937' : '2px solid #e9ecef'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{plan.amount}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{plan.validity}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{plan.channels} channels</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{plan.description}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#f3f4f6', borderRadius: '10px' }}>
            <h4 style={{ color: '#374151', marginBottom: '10px', fontSize: '1rem' }}>💡 Pro Tip</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Recharge before your current plan expires to avoid service interruption. 
              You can also set up auto-recharge for convenience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DTHRecharge;