import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { Smartphone, Check, Star } from 'lucide-react';

const MobileRecharge = () => {
  const { addTransaction } = useUser();
  const [formData, setFormData] = useState({
    mobile: '',
    operator: '',
    circle: '',
    amount: '',
    plan: null
  });
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const operators = [
    'Airtel', 'Jio', 'Vi (Vodafone Idea)', 'BSNL', 'Aircel'
  ];

  const circles = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad'
  ];

  const plans = [
    { id: 1, amount: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', popular: true },
    { id: 2, amount: 299, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
    { id: 3, amount: 399, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
    { id: 4, amount: 599, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', popular: true },
    { id: 5, amount: 999, validity: '365 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
    { id: 6, amount: 149, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', popular: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBrowsePlans = () => {
    if (formData.mobile && formData.operator && formData.circle) {
      setShowPlans(true);
    } else {
      alert('Please fill mobile number, operator, and circle first');
    }
  };

  const selectPlan = (plan) => {
    setFormData(prev => ({
      ...prev,
      plan: plan,
      amount: plan.amount.toString()
    }));
    setShowPlans(false);
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    if (!formData.mobile || !formData.operator || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      addTransaction({
        type: 'Mobile Recharge',
        number: formData.mobile,
        operator: formData.operator,
        amount: Number(formData.amount),
        method: 'UPI',
      });
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  const isFormValid =
    /^[0-9]{10}$/.test(formData.mobile) &&
    !!formData.operator &&
    !!formData.circle &&
    Number(formData.amount) >= 10;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <Smartphone size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mobile Recharge</h1>
      </div>

      {success && (
        <div className="bg-gray-100 border border-gray-400 text-gray-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check size={20} />
          Recharge successful! Your mobile has been recharged with ₹{formData.amount}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recharge Details</h3>
          <form onSubmit={handleRecharge} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="input text-xl h-16"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Operator *</label>
              <select
                name="operator"
                value={formData.operator}
                onChange={handleInputChange}
                className="input text-xl h-16"
                required
              >
                <option value="">Select Operator</option>
                {operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Circle *</label>
              <select
                name="circle"
                value={formData.circle}
                onChange={handleInputChange}
                className="input text-xl h-16"
                required
              >
                <option value="">Select Circle</option>
                {circles.map(circle => (
                  <option key={circle} value={circle}>{circle}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="input text-xl h-16"
                placeholder="Enter amount"
                min="10"
                max="5000"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button
                type="button"
                onClick={handleBrowsePlans}
                className="btn btn-secondary flex-1 h-16 text-xl font-black"
              >
                Browse Plans
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 h-16 text-xl font-black"
                disabled={loading || !isFormValid}
              >
                {loading ? 'Processing...' : 'Recharge Now'}
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Amounts</h3>
          <div className="grid grid-cols-3 gap-3">
            {[99, 149, 199, 299, 399, 599].map(amount => (
              <div
                key={amount}
                className={`quick-amount ${formData.amount === amount.toString() ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
              >
                ₹{amount}
              </div>
            ))}
          </div>

          {formData.plan && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="text-gray-800 font-semibold mb-3">Selected Plan</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Amount:</strong> ₹{formData.plan.amount}</div>
                <div><strong>Validity:</strong> {formData.plan.validity}</div>
                <div><strong>Data:</strong> {formData.plan.data}</div>
                <div><strong>Calls:</strong> {formData.plan.calls}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPlans && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Available Plans</h3>
              <button
                onClick={() => setShowPlans(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`card cursor-pointer relative transition-all duration-200 hover:shadow-md ${
                    plan.popular ? 'border-2 border-gray-800' : 'border border-gray-200'
                  }`}
                  onClick={() => selectPlan(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star size={12} />
                      Popular
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">₹{plan.amount}</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div><strong>Validity:</strong> {plan.validity}</div>
                      <div><strong>Data:</strong> {plan.data}</div>
                      <div><strong>Calls:</strong> {plan.calls}</div>
                      <div><strong>SMS:</strong> {plan.sms}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileRecharge;