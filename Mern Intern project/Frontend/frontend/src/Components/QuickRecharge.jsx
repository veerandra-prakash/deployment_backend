import React, { useState } from 'react';
import { Zap, Check, Clock, Star } from 'lucide-react';

const QuickRecharge = () => {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const savedNumbers = [
    { number: '9876543210', operator: 'Airtel', label: 'Personal', lastRecharge: '₹299' },
    { number: '9876543211', operator: 'Jio', label: 'Work', lastRecharge: '₹199' },
    { number: '8765432109', operator: 'Vi', label: 'Family', lastRecharge: '₹149' },
    { number: '7654321098', operator: 'BSNL', label: 'Emergency', lastRecharge: '₹99' }
  ];

  const quickAmounts = [
    { amount: 99, popular: false, validity: '28 days', data: '1GB' },
    { amount: 149, popular: true, validity: '28 days', data: '1GB/day' },
    { amount: 199, popular: true, validity: '28 days', data: '2GB/day' },
    { amount: 299, popular: false, validity: '28 days', data: '2.5GB/day' },
    { amount: 399, popular: false, validity: '56 days', data: '2GB/day' },
    { amount: 599, popular: true, validity: '84 days', data: '2GB/day' }
  ];

  const recentRecharges = [
    { number: '9876543210', amount: 299, operator: 'Airtel', time: '2 hours ago' },
    { number: '9876543211', amount: 199, operator: 'Jio', time: '1 day ago' },
    { number: '8765432109', amount: 149, operator: 'Vi', time: '3 days ago' }
  ];

  const handleQuickRecharge = async () => {
    if (!selectedNumber || !selectedAmount) {
      alert('Please select a number and amount');
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

  const repeatRecharge = (recharge) => {
    setSelectedNumber(recharge.number);
    setSelectedAmount(recharge.amount.toString());
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Zap size={32} style={{ color: '#f5576c' }} />
        <h1 style={{ color: '#333', margin: 0 }}>Quick Recharge</h1>
      </div>

      {success && (
        <div className="alert alert-success">
          <Check size={20} style={{ marginRight: '10px' }} />
          Quick recharge successful! ₹{selectedAmount} recharged to {selectedNumber}
        </div>
      )}

      <div className="grid grid-2">
        {/* Quick Recharge Form */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#333' }}>One-Tap Recharge</h3>
          
          <div className="space-y-8">
            {/* Saved Numbers */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-gray-800">Select Number</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedNumbers.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedNumber === item.number 
                        ? 'bg-teal-500 text-white border-teal-500 shadow-lg' 
                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-teal-300'
                    }`}
                    onClick={() => setSelectedNumber(item.number)}
                  >
                    <div className="font-bold font-mono text-lg">
                      {item.number}
                    </div>
                    <div className={`text-sm mt-1 ${
                      selectedNumber === item.number ? 'text-teal-100' : 'text-gray-600'
                    }`}>
                      {item.operator} • {item.label}
                    </div>
                    <div className={`text-xs mt-1 ${
                      selectedNumber === item.number ? 'text-teal-200' : 'text-gray-500'
                    }`}>
                      Last: {item.lastRecharge}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-gray-800">Select Amount</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickAmounts.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                      selectedAmount === item.amount.toString()
                        ? 'bg-teal-500 text-white border-teal-500 shadow-lg'
                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-teal-300'
                    }`}
                    onClick={() => setSelectedAmount(item.amount.toString())}
                  >
                    {item.popular && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center">
                        <Star size={12} />
                      </div>
                    )}
                    <div className="font-bold text-xl">₹{item.amount}</div>
                    <div className={`text-xs mt-1 ${
                      selectedAmount === item.amount.toString() ? 'text-teal-100' : 'text-gray-600'
                    }`}>
                      {item.validity}
                    </div>
                    <div className={`text-xs ${
                      selectedAmount === item.amount.toString() ? 'text-teal-200' : 'text-gray-500'
                    }`}>
                      {item.data}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recharge Button */}
          <button
            onClick={handleQuickRecharge}
            className="btn w-100"
            disabled={loading || !selectedNumber || !selectedAmount}
            style={{
              background: loading ? '#ccc' : 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
              fontSize: '1.1rem',
              padding: '15px'
            }}
          >
            {loading ? (
              <>
                <Clock size={20} style={{ marginRight: '10px' }} />
                Processing...
              </>
            ) : (
              <>
                <Zap size={20} style={{ marginRight: '10px' }} />
                Quick Recharge ₹{selectedAmount || '0'}
              </>
            )}
          </button>

          {selectedNumber && selectedAmount && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: '#e8f5e8',
              borderRadius: '10px',
              border: '1px solid #c3e6cb'
            }}>
              <h4 style={{ color: '#155724', marginBottom: '10px', fontSize: '1rem' }}>
                Recharge Summary
              </h4>
              <div style={{ fontSize: '0.9rem', color: '#155724' }}>
                <div><strong>Number:</strong> {selectedNumber}</div>
                <div><strong>Amount:</strong> ₹{selectedAmount}</div>
                <div><strong>Operator:</strong> {savedNumbers.find(n => n.number === selectedNumber)?.operator}</div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Recharges & Repeat */}
        <div>
          {/* Recent Recharges */}
          <div className="card mb-3">
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Recharges</h3>
            {recentRecharges.map((recharge, index) => (
              <div key={index} className="transaction-item">
                <div>
                  <div style={{ fontWeight: '500', color: '#333', fontFamily: 'monospace' }}>
                    {recharge.number}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {recharge.operator} • {recharge.time}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontWeight: 'bold', color: '#667eea' }}>
                    ₹{recharge.amount}
                  </span>
                  <button
                    onClick={() => repeatRecharge(recharge)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    Repeat
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Tips</h3>
            <div style={{ background: '#f0f8ff', padding: '20px', borderRadius: '10px' }}>
              <h4 style={{ color: '#0066cc', marginBottom: '15px', fontSize: '1rem' }}>
                ⚡ Lightning Fast Recharge
              </h4>
              <ul style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Save frequently used numbers for instant access</li>
                <li>Popular amounts are marked with a star</li>
                <li>Repeat previous recharges with one click</li>
                <li>All recharges are processed within 30 seconds</li>
                <li>Get instant confirmation via SMS</li>
              </ul>
            </div>

            <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '10px' }}>
              <h4 style={{ color: '#856404', marginBottom: '10px', fontSize: '1rem' }}>
                💰 Save More
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                Use promo codes from the Offers section to get cashback and discounts on your recharges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickRecharge;