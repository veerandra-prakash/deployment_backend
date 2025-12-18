import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Tv, CreditCard, Zap, TrendingUp, Users, Award, Shield, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const Home = () => {
  const { token } = useUser();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      text: 'LivPay has made my bill payments so much easier. The interface is simple and transactions are always successful.'
    },
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      text: 'I love how quick the mobile recharges are. Never had any issues and the customer support is excellent.'
    },
    {
      name: 'Amit Patel',
      role: 'Teacher',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      text: 'Reliable service for all my family\'s recharge needs. Simple, fast, and trustworthy platform.'
    },
    {
      name: 'Sneha Reddy',
      role: 'Doctor',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      text: 'The DTH recharge feature is fantastic. I can manage all my subscriptions in one place easily.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const quickActions = [
    {
      title: 'Mobile Recharge',
      description: 'Instant mobile top-up',
      icon: Smartphone,
      link: '/mobile-recharge'
    },
    {
      title: 'DTH Recharge',
      description: 'TV & DTH services',
      icon: Tv,
      link: '/dth-recharge'
    },
    {
      title: 'Bill Payment',
      description: 'Pay utility bills',
      icon: CreditCard,
      link: '/bill-payment'
    },
    {
      title: 'Quick Recharge',
      description: 'One-tap recharge',
      icon: Zap,
      link: '/quick-recharge'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Users', icon: Users },
    { number: '99.9%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Award }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to LivPay
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Your trusted partner for mobile recharge, DTH, bill payments and more. 
              Simple, secure, and reliable service at your fingertips.
            </p>
            <Link to={token ? "/mobile-recharge" : "/login"} className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
              {token ? "Start Recharge" : "Get Started"}
            </Link>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center" 
              alt="Digital Payment" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-black mb-2">Our Services</h2>
        <p className="text-center text-gray-600 mb-8">Quick access to all our premium services</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const images = [
              'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
              'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300&h=200&fit=crop',
              'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
              'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
            ];
            const linkTo = token ? action.link : '/login';
            return (
              <Link key={index} to={linkTo} className="group">
                <div className="bg-white rounded-lg hover:shadow-lg transition-all duration-200 relative p-6">
                  <img 
                    src={images[index]} 
                    alt={action.title} 
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{action.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{action.description}</p>
                  {!token && (
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-lg transition-colors flex items-center justify-center">
                      <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100">Sign in to use</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Choose LivPay Section */}
      <div className="bg-gray-50 rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose LivPay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Processing</h3>
            <p className="text-gray-600">Lightning-fast recharges processed within seconds</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fastest Growth</h3>
            <p className="text-gray-600">50K+ users trust us daily</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-600">Built for Indian users, by Indian developers</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index}>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Customers Say</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center">
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name} 
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-black"
            />
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gray-800 fill-current" />
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-6 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            <h4 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
            <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].role}</p>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose LivPay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop&crop=center" 
              alt="Fast Processing" 
              className="w-full rounded-lg shadow-sm mb-4"
            />
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900">Instant Processing</h4>
            <p className="text-gray-600">Lightning-fast recharges and bill payments processed within seconds</p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center" 
              alt="Secure Payment" 
              className="w-full rounded-lg shadow-sm mb-4"
            />
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900">Secure & Reliable</h4>
            <p className="text-gray-600">Bank-grade security with 99.9% uptime guarantee</p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=300&h=200&fit=crop&crop=center" 
              alt="Customer Support" 
              className="w-full rounded-lg shadow-sm mb-4"
            />
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900">24/7 Support</h4>
            <p className="text-gray-600">Round-the-clock customer support for all your queries</p>
          </div>
        </div>
      </div>

      {/* Company Gallery */}
      <div className="card">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=250&h=200&fit=crop" 
            alt="Office" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=250&h=200&fit=crop" 
            alt="Team" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=250&h=200&fit=crop" 
            alt="Technology" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=250&h=200&fit=crop" 
            alt="Innovation" 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
