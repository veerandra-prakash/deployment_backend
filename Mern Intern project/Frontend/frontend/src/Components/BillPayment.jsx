import React, { useState } from 'react';
import { CreditCard, Check, Zap, Droplets, Wifi, Car } from 'lucide-react';

const BillPayment = () => {
  const [selectedBillType, setSelectedBillType] = useState('');
  const [formData, setFormData] = useState({
    billNumber: '',
    provider: '',
    amount: '',
    billInfo: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchingBill, setFetchingBill] = useState(false);

  const billTypes = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: '#1f2937' },
    { id: 'water', name: 'Water', icon: Droplets, color: '#374151' },
    { id: 'gas', name: 'Gas', icon: Car, color: '#4b5563' },
    { id: 'internet', name: 'Internet', icon: Wifi, color: '#6b7280' }
  ];

  const providers = {
    electricity: ['BESCOM', 'MSEDCL', 'TNEB', 'KESCO', 'WBSEDCL', 'PSPCL'],
    water: ['Bangalore Water Supply', 'Mumbai Municipal Corporation', 'Delhi Jal Board', 'Chennai Metro Water'],
    gas: ['Indane Gas', 'Bharat Gas', 'HP Gas', 'Adani Gas'],
    internet: ['Airtel Broadband', 'Jio Fiber', 'BSNL Broadband', 'ACT Fibernet', 'Hathway']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchBillDetails = async () => {
    if (!formData.billNumber || !formData.provider) {
      alert('Please enter bill number and select provider');
      return;
    }

    setFetchingBill(true);
    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        billInfo: {
          customerName: 'John Doe',
          billAmount: '₹2,450.00',
          dueDate: '25 Dec 2024',
          billPeriod: 'Nov 2024',
          units: selectedBillType === 'electricity' ? '245 kWh' : null,
          address: '123 Main Street, Apartment 4B, City - 560001'
        },
        amount: '2450'
      }));
      setFetchingBill(false);
    }, 1500);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.billNumber || !formData.provider || !formData.amount) {
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
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <CreditCard size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bill Payment</h1>
      </div>

      {success && (
        <div className="bg-gray-100 border border-gray-400 text-gray-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check size={20} />
          Bill payment successful! Your {selectedBillType} bill has been paid.
        </div>
      )}

      {/* Bill Type Selection */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Select Bill Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {billTypes.map(type => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                className={`card ${selectedBillType === type.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedBillType(type.id);
                  setFormData({ billNumber: '', provider: '', amount: '', billInfo: null });
                }}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: selectedBillType === type.id ? type.color : 'white',
                  color: selectedBillType === type.id ? 'white' : '#333',
                  border: selectedBillType === type.id ? `2px solid ${type.color}` : '1px solid #eee'
                }}
              >
                <Icon size={40} style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: 0 }}>{type.name}</h4>
              </div>
            );
          })}
        </div>
      </div>

      {selectedBillType && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Bill Details</h3>
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-base font-semibold text-gray-800 mb-2">Bill Number / Consumer Number *</label>
                <input
                  type="text"
                  name="billNumber"
                  value={formData.billNumber}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  placeholder="Enter your bill number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-semibold text-gray-800 mb-2">Service Provider *</label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  required
                >
                  <option value="">Select Provider</option>
                  {providers[selectedBillType]?.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={fetchBillDetails}
                className="btn btn-secondary w-full h-14 text-lg font-semibold"
                disabled={fetchingBill}
              >
                {fetchingBill ? 'Fetching Bill...' : 'Fetch Bill Details'}
              </button>

              <div className="space-y-2">
                <label className="block text-base font-semibold text-gray-800 mb-2">Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="input text-lg h-14"
                  placeholder="Enter amount to pay"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-14 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? 'Processing Payment...' : 'Pay Bill'}
              </button>
            </form>
          </div>

          <div className="card">
            {formData.billInfo ? (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Bill Information</h3>
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Customer Name:</strong>
                    <div style={{ color: '#666', marginTop: '5px' }}>{formData.billInfo.customerName}</div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Bill Amount:</strong>
                    <div style={{ color: '#1f2937', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>
                      {formData.billInfo.billAmount}
                    </div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Due Date:</strong>
                    <div style={{ color: '#4b5563', marginTop: '5px' }}>{formData.billInfo.dueDate}</div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Bill Period:</strong>
                    <div style={{ color: '#666', marginTop: '5px' }}>{formData.billInfo.billPeriod}</div>
                  </div>
                  {formData.billInfo.units && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong>Units Consumed:</strong>
                      <div style={{ color: '#666', marginTop: '5px' }}>{formData.billInfo.units}</div>
                    </div>
                  )}
                  <div>
                    <strong>Address:</strong>
                    <div style={{ color: '#666', marginTop: '5px', fontSize: '0.9rem' }}>
                      {formData.billInfo.address}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Tips</h3>
                <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px' }}>
                  <h4 style={{ color: '#374151', marginBottom: '15px', fontSize: '1rem' }}>💡 Payment Tips</h4>
                  <ul style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                    <li>Pay your bills before the due date to avoid late fees</li>
                    <li>Set up auto-pay for recurring bills</li>
                    <li>Keep your bill number handy for quick payments</li>
                    <li>Check for any promotional offers or cashbacks</li>
                    <li>Save payment receipts for your records</li>
                  </ul>
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', padding: '15px', background: '#f9fafb', borderRadius: '10px' }}>
              <h4 style={{ color: '#374151', marginBottom: '10px', fontSize: '1rem' }}>⚡ Instant Payment</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                All bill payments are processed instantly. You'll receive a confirmation SMS and email 
                within minutes of successful payment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillPayment;