import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Tv, CreditCard, ArrowRight, Check, Star } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import rechargeHero from '../assets/recharge.jpg';

const LandingPage = () => {
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
  const services = [
    {
      title: 'Mobile Recharge',
      description: 'Instant mobile top-up for all operators',
      icon: Smartphone,
      serviceType: 'mobile'
    },
    {
      title: 'DTH Recharge',
      description: 'Recharge TV & DTH services',
      icon: Tv,
      serviceType: 'dth'
    },
    {
      title: 'Bill Payment',
      description: 'Pay utility bills online',
      icon: CreditCard,
      serviceType: 'bill'
    }
  ];

  // Mobile Recharge Plans
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
      amount: 599, 
      validity: '84 days', 
      data: '2GB/day', 
      calls: 'Unlimited', 
      sms: '100/day',
      description: 'Extended Plan',
      popular: true 
    }
  ];

  // DTH Recharge Plans
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
    }
  ];

  // Bill Payment Plans
  const billPaymentPlans = [
    {
      id: 1,
      type: 'Electricity',
      description: 'Pay electricity bills instantly',
      features: ['All electricity providers', 'Instant payment confirmation', 'Bill history tracking', 'Auto-pay option'],
      icon: CreditCard
    },
    {
      id: 2,
      type: 'Water',
      description: 'Pay water utility bills',
      features: ['All water board services', 'Quick payment processing', 'Receipt generation', 'Payment reminders'],
      icon: CreditCard
    },
    {
      id: 3,
      type: 'Gas',
      description: 'Pay gas cylinder bills',
      features: ['All gas providers', 'Instant booking', 'Delivery tracking', 'Subscription plans'],
      icon: CreditCard
    },
    {
      id: 4,
      type: 'Internet',
      description: 'Pay internet and broadband bills',
      features: ['All ISPs supported', 'Auto-renewal option', 'Usage tracking', 'Multiple plans'],
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-gray-300 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="text-3xl font-bold text-black hover:text-gray-700 transition-colors">
              LivPay
            </Link>
            <div className="flex gap-3 items-center">
              <Link 
                to="/login" 
                className="px-6 py-3 text-black hover:text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-black transition-all duration-200 hover:shadow-md"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Simple. Secure. Reliable.
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Recharge mobile, DTH, and pay bills—all in one place. 
                Fast, secure, and trusted by thousands.
              </p>
              {!token || !user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/login" 
                    className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Login <ArrowRight size={20} />
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Sign Up <ArrowRight size={20} />
                  </Link>
                  <Link 
                    to="/recharge-plans" 
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-black hover:text-black transition-all duration-200"
                  >
                    View Plans
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/dashboard" 
                    className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Go to Dashboard <ArrowRight size={20} />
                  </Link>
                  <Link 
                    to="/recharge-plans" 
                    className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    View All Plans
                  </Link>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <img 
                src={rechargeHero}
                alt="Recharge illustration" 
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">Our Services</h2>
          <p className="text-center text-gray-600 mb-12">Everything you need in one platform</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const serviceImages = [
                'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
                'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=250&fit=crop',
                'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
              ];
              return (
                <button
                  key={idx}
                  onClick={() => handlePlanClick(service.serviceType)}
                  className="group w-full text-left"
                >
                  <div className="bg-white border border-gray-200 rounded-lg hover:border-black transition-all overflow-hidden cursor-pointer">
                    <img 
                      src={serviceImages[idx]} 
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-800 transition-colors">
                        <Icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-black">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Recharge Plans Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Smartphone size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black">Mobile Recharge Plans</h2>
            </div>
            <p className="text-gray-600">Choose the best mobile recharge plan for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mobilePlans.map((plan) => {
              const planImages = [
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop'
              ];
              return (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                <img 
                  src={planImages[plan.id - 1]} 
                  alt={`Plan ${plan.amount}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-6 flex flex-col h-full">
                {plan.popular && (
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="text-black fill-black" />
                    <span className="text-sm font-semibold text-black">Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-black mb-2">₹{plan.amount}</div>
                  <div className="text-sm text-gray-500 mb-4">{plan.description}</div>
                  <div className="h-px bg-gray-200 my-4"></div>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Validity</span>
                    <span className="font-semibold text-black text-sm">{plan.validity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Data</span>
                    <span className="font-semibold text-black text-sm">{plan.data}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Calls</span>
                    <span className="font-semibold text-black text-sm">{plan.calls}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlanClick('mobile')}
                  className="w-full text-center py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 text-sm shadow-md hover:shadow-lg mt-auto"
                >
                  Choose Plan
                </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DTH Recharge Plans Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Tv size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black">DTH Recharge Plans</h2>
            </div>
            <p className="text-gray-600">Comprehensive DTH packages for your entertainment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dthPlans.map((plan) => {
              const dthImages = [
                'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop'
              ];
              return (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                <img 
                  src={dthImages[plan.id - 1]} 
                  alt={`DTH Plan ${plan.amount}`}
                  className="w-full h-32 object-cover"
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
                    <span className="text-gray-600 text-sm">Validity</span>
                    <span className="font-semibold text-black text-sm">{plan.validity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Channels</span>
                    <span className="font-semibold text-black text-sm">{plan.channels}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">HD Channels</span>
                    <span className="font-semibold text-black text-sm">{plan.hdChannels}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlanClick('dth')}
                  className="w-full text-center py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 text-sm shadow-md hover:shadow-lg mt-auto"
                >
                  Choose Plan
                </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bill Payment Plans Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <CreditCard size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black">Bill Payment Services</h2>
            </div>
            <p className="text-gray-600">Pay all your utility bills quickly and securely</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {billPaymentPlans.map((plan) => {
              const Icon = plan.icon;
              const billImages = [
                'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=250&fit=crop',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=250&fit=crop',
                'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=250&fit=crop',
                'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=250&fit=crop'
              ];
              return (
                <div
                  key={plan.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
                >
                  <img 
                    src={billImages[plan.id - 1]} 
                    alt={`${plan.type} Bill Payment`}
                    className="w-full h-40 object-cover"
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
                  
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check size={16} className="text-black flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanClick('bill')}
                    className="w-full text-center py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-200 text-sm shadow-md hover:shadow-lg mt-auto"
                  >
                    Pay Bills
                  </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose LivPay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">50K+</div>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">99.9%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied users and manage all your payments with LivPay
          </p>
          <Link 
            to="/register" 
            className="px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-100 inline-block transition-colors"
          >
            Create Free Account Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-black font-bold mb-4">LivPay</h4>
              <p className="text-sm text-gray-600">Your trusted payment platform.</p>
            </div>
            <div>
              <h4 className="text-black font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-black transition-colors">Mobile Recharge</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">DTH Recharge</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Bill Payment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-black transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Contact</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 LivPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
