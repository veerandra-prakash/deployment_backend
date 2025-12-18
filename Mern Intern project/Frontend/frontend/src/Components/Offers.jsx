import React, { useState } from 'react';
import { Gift, Star, Clock, Copy, Check } from 'lucide-react';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState('');

  const offers = [
    {
      id: 1,
      title: 'First Recharge Bonus',
      description: 'Get 10% cashback on your first mobile recharge',
      discount: '10% Cashback',
      code: 'FIRST10',
      category: 'mobile',
      validTill: '2024-12-31',
      minAmount: 100,
      maxCashback: 50,
      terms: ['Valid only for new users', 'Minimum recharge of ₹100', 'Maximum cashback ₹50'],
      popular: true
    },
    {
      id: 2,
      title: 'DTH Super Saver',
      description: 'Save ₹100 on DTH recharges above ₹500',
      discount: '₹100 Off',
      code: 'DTH100',
      category: 'dth',
      validTill: '2024-12-25',
      minAmount: 500,
      maxCashback: 100,
      terms: ['Valid on all DTH operators', 'Minimum recharge of ₹500', 'One time use per user'],
      popular: false
    },
    {
      id: 3,
      title: 'Bill Payment Bonanza',
      description: 'Get 5% cashback on all utility bill payments',
      discount: '5% Cashback',
      code: 'BILL5',
      category: 'bills',
      validTill: '2024-12-30',
      minAmount: 200,
      maxCashback: 200,
      terms: ['Valid on electricity, water, gas bills', 'Minimum bill amount ₹200', 'Maximum cashback ₹200'],
      popular: true
    },
    {
      id: 4,
      title: 'Weekend Special',
      description: 'Extra 15% off on all recharges during weekends',
      discount: '15% Off',
      code: 'WEEKEND15',
      category: 'mobile',
      validTill: '2024-12-29',
      minAmount: 150,
      maxCashback: 75,
      terms: ['Valid only on Saturday & Sunday', 'Minimum recharge of ₹150', 'Maximum discount ₹75'],
      popular: false
    },
    {
      id: 5,
      title: 'Loyalty Reward',
      description: 'Special offer for our loyal customers',
      discount: '20% Cashback',
      code: 'LOYAL20',
      category: 'all',
      validTill: '2024-12-28',
      minAmount: 300,
      maxCashback: 100,
      terms: ['Valid for users with 5+ transactions', 'Minimum amount ₹300', 'Maximum cashback ₹100'],
      popular: true
    },
    {
      id: 6,
      title: 'Quick Recharge Offer',
      description: 'Instant discount on quick recharge amounts',
      discount: '₹25 Off',
      code: 'QUICK25',
      category: 'mobile',
      validTill: '2024-12-27',
      minAmount: 199,
      maxCashback: 25,
      terms: ['Valid on predefined quick amounts', 'Minimum recharge of ₹199', 'Instant discount applied'],
      popular: false
    }
  ];

  // Build categories dynamically from the offers list so new offer types
  // automatically appear as filter options.
  const categoryCounts = offers.reduce((acc, offer) => {
    if (offer.category && offer.category !== 'all') {
      acc[offer.category] = (acc[offer.category] || 0) + 1;
    }
    return acc;
  }, {});

  const categories = [
    { id: 'all', name: 'All Offers', count: offers.length },
    ...Object.entries(categoryCounts).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      count
    }))
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab || offer.category === 'all');

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const getDaysLeft = (validTill) => {
    const today = new Date();
    const expiry = new Date(validTill);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <Gift size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Offers & Deals</h1>
      </div>

      {/* Category Tabs */}
      <div className="card mb-3">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === category.id 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-2">
        {filteredOffers.map(offer => (
          <div 
            key={offer.id} 
            className="card" 
            style={{ 
              position: 'relative',
              border: offer.popular ? '2px solid #1f2937' : '1px solid #eee'
            }}
          >
            {offer.popular && (
              <div
                className="offer-badge"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}
              >
                <Star size={12} />
                Popular
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px', fontSize: '1.2rem' }}>
                {offer.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {offer.description}
              </p>
            </div>

            <div style={{ 
              background: '#1f2937',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginBottom: '15px'
            }}>
              {offer.discount}
            </div>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>Promo Code</span>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    {offer.code}
                  </div>
                </div>
                <button
                  onClick={() => copyCode(offer.code)}
                  className="btn btn-secondary"
                  style={{ 
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div className="d-flex align-items-center gap-1 mb-2">
                <Clock size={16} style={{ color: '#666' }} />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {getDaysLeft(offer.validTill)} days left
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                Valid till: {new Date(offer.validTill).toLocaleDateString()}
              </div>
            </div>

            <div style={{ 
              background: '#e3f2fd', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <h4 style={{ 
                fontSize: '0.9rem', 
                color: '#1976d2', 
                marginBottom: '8px' 
              }}>
                Offer Details
              </h4>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                <div>Min Amount: ₹{offer.minAmount}</div>
                <div>Max Benefit: ₹{offer.maxCashback}</div>
              </div>
            </div>

            <details style={{ fontSize: '0.8rem', color: '#666' }}>
              <summary style={{ 
                cursor: 'pointer', 
                fontWeight: '500',
                marginBottom: '8px',
                color: '#333'
              }}>
                Terms & Conditions
              </summary>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.5' }}>
                {offer.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="card text-center" style={{ padding: '60px 20px' }}>
          <Gift size={48} style={{ color: '#ccc', marginBottom: '20px' }} />
          <h3 style={{ color: '#666', marginBottom: '10px' }}>No offers available</h3>
          <p style={{ color: '#999' }}>Check back later for exciting deals and offers!</p>
        </div>
      )}

      {/* How to Use Section */}
      <div className="card mt-4">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>How to Use Promo Codes</h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#1f2937',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Copy Code</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Click the copy button to copy the promo code
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#374151',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              2
            </div>
            <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Make Payment</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Proceed with your recharge or bill payment
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#4b5563',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              3
            </div>
            <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Apply Code</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Paste the code at checkout to get discount
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;