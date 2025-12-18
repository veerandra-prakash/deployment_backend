import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Tv, CreditCard, Check, ArrowRight, Star } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const RechargePlans = () => {
  const { token, user } = useUser();
  const navigate = useNavigate();

  const handlePlanClick = (serviceType) => {
    if (!token || !user) {
      navigate('/login');
    } else {
      // Redirect to appropriate service page based on plan type
      if (serviceType === 'mobile') {
        navigate('/mobile-recharge');
      } else if (serviceType === 'dth') {
        navigate('/dth-recharge');
      } else if (serviceType === 'bill') {
        navigate('/bill-payment');
      }
    }
  };
  // Mobile Recharge Plans - Detailed
  const mobilePlans = [
    { 
      id: 1, 
      amount: 149, 
      validity: '28 days', 
      data: '1GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Basic Plan',
      popular: false 
    },
    { 
      id: 2, 
      amount: 199, 
      validity: '28 days', 
      data: '2GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Popular Plan',
      popular: true 
    },
    { 
      id: 3, 
      amount: 299, 
      validity: '28 days', 
      data: '2.5GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Standard Plan',
      popular: false 
    },
    { 
      id: 4, 
      amount: 399, 
      validity: '56 days', 
      data: '2GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Long Validity',
      popular: false 
    },
    { 
      id: 5, 
      amount: 599, 
      validity: '84 days', 
      data: '2GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Extended Plan',
      popular: true 
    },
    { 
      id: 6, 
      amount: 999, 
      validity: '365 days', 
      data: '1.5GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Annual Plan',
      popular: false 
    }
  ];

  // DTH Recharge Plans - Detailed
  const dthPlans = [
    {
      id: 1,
      amount: 299,
      validity: '30 days',
      channels: '200+',
      hdChannels: '50+',
      description: 'Basic Pack',
      popular: false
    },
    {
      id: 2,
      amount: 499,
      validity: '30 days',
      channels: '300+',
      hdChannels: '100+',
      description: 'Family Pack',
      popular: true
    },
    {
      id: 3,
      amount: 699,
      validity: '30 days',
      channels: '400+',
      hdChannels: '150+',
      description: 'Premium Pack',
      popular: false
    },
    {
      id: 4,
      amount: 999,
      validity: '30 days',
      channels: '500+',
      hdChannels: '200+',
      description: 'Ultimate Pack',
      popular: false
    },
    {
      id: 5,
      amount: 1299,
      validity: '60 days',
      channels: '400+',
      hdChannels: '150+',
      description: 'Premium Long',
      popular: false
    },
    {
      id: 6,
      amount: 1799,
      validity: '90 days',
      channels: '500+',
      hdChannels: '200+',
      description: 'Ultimate Long',
      popular: false
    }
  ];

  // Bill Payment Plans
  const billPaymentPlans = [
    {
      id: 1,
      type: 'Electricity',
      description: 'Pay electricity bills instantly',
      features: [
        'All electricity providers',
        'Instant payment confirmation',
        'Bill history tracking',
        'Auto-pay option',
        'No service charges'
      ],
      icon: CreditCard
    },
    {
      id: 2,
      type: 'Water',
      description: 'Pay water utility bills',
      features: [
        'All water board services',
        'Quick payment processing',
        'Receipt generation',
        'Payment reminders',
        'No hidden fees'
      ],
      icon: CreditCard
    },
    {
      id: 3,
      type: 'Gas',
      description: 'Pay gas cylinder bills',
      features: [
        'All gas providers',
        'Instant booking',
        'Delivery tracking',
        'Subscription plans',
        'Cashback offers'
      ],
      icon: CreditCard
    },
    {
      id: 4,
      type: 'Internet',
      description: 'Pay internet and broadband bills',
      features: [
        'All ISPs supported',
        'Auto-renewal option',
        'Usage tracking',
        'Multiple plans',
        'Discounts available'
      ],
      icon: CreditCard
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Recharge & Payment Plans</h1>
              <p className="text-xl text-gray-600 mb-6">
                Choose from a wide variety of recharge and payment plans tailored to your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!token || !user ? (
                  <>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-200"
                    >
                      Login <ArrowRight size={20} />
                    </Link>
                    <Link 
                      to="/register" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Sign Up <ArrowRight size={20} />
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Go to Dashboard <ArrowRight size={20} />
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="Payment Plans" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Recharge Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <Smartphone size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black">Mobile Recharge Plans</h2>
          </div>
          <p className="text-gray-600">Select from our best mobile recharge plans for all operators</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobilePlans.map((plan) => {
            const planImages = [
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=250&fit=crop'
            ];
            return (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              <img 
                src={planImages[plan.id - 1]} 
                alt={`Plan ₹${plan.amount}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 flex flex-col h-full">
              {plan.popular && (
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-black fill-black" />
                  <span className="text-sm font-semibold text-black">Popular Choice</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black mb-2">₹{plan.amount}</div>
                <div className="text-sm text-gray-500 mb-4">{plan.description}</div>
                <div className="h-px bg-gray-200 my-4"></div>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-semibold text-black">{plan.validity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data</span>
                  <span className="font-semibold text-black">{plan.data}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calls</span>
                  <span className="font-semibold text-black">{plan.calls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMS</span>
                  <span className="font-semibold text-black">{plan.sms}</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanClick('mobile')}
                className="w-full text-center py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg mt-auto"
              >
                Choose Plan
              </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* DTH Recharge Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <Tv size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black">DTH Recharge Plans</h2>
          </div>
          <p className="text-gray-600">Comprehensive DTH packages for all your entertainment needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dthPlans.map((plan) => {
            const dthImages = [
              'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=250&fit=crop',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop'
            ];
            return (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              <img 
                src={dthImages[plan.id - 1]} 
                alt={`DTH Plan ₹${plan.amount}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 flex flex-col h-full">
              {plan.popular && (
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-black fill-black" />
                  <span className="text-sm font-semibold text-black">Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black mb-2">₹{plan.amount}</div>
                <div className="text-sm text-gray-500 mb-4">{plan.description}</div>
                <div className="h-px bg-gray-200 my-4"></div>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-semibold text-black">{plan.validity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Channels</span>
                  <span className="font-semibold text-black">{plan.channels}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">HD Channels</span>
                  <span className="font-semibold text-black">{plan.hdChannels}</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanClick('dth')}
                className="w-full text-center py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg mt-auto"
              >
                Choose Plan
              </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Bill Payment Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black">Bill Payment Services</h2>
          </div>
          <p className="text-gray-600">Pay all your utility bills quickly and securely</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {billPaymentPlans.map((plan) => {
            const Icon = plan.icon;
            const billImages = [
              'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
              'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=300&fit=crop',
              'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop'
            ];
            return (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                <img 
                  src={billImages[plan.id - 1]} 
                  alt={`${plan.type} Bill Payment`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">{plan.type} Bill Payment</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check size={18} className="text-black flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick('bill')}
                  className="w-full text-center py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:shadow-lg mt-auto"
                >
                  Pay Bills
                </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose LivPay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Bank-grade security with 99.9% uptime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Instant Processing</h3>
              <p className="text-gray-600">Lightning-fast recharges processed within seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of satisfied users and manage all your payments with LivPay
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Free Account <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RechargePlans;
