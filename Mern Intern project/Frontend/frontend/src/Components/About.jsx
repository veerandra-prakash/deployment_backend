import React from 'react';
import { Shield, Zap, Users, Award, Clock, HeadphonesIcon } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant recharges and bill payments processed within seconds'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Bank-grade security with SSL encryption and secure payment gateways'
    },
    {
      icon: Users,
      title: '50K+ Users',
      description: 'Trusted by thousands of customers across India'
    },
    {
      icon: Award,
      title: '99.9% Success',
      description: 'Industry-leading success rate for all transactions'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock availability for all your recharge needs'
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Dedicated customer support team to help you anytime'
    }
  ];

  const milestones = [
    { year: '2023', event: 'LivPay Founded', description: 'Started with a vision to simplify recharges' },
    { year: '2023', event: '10K Users', description: 'Reached our first 10,000 happy customers' },
    { year: '2024', event: 'Bill Payments', description: 'Expanded to utility bill payments' },
    { year: '2024', event: '50K Users', description: 'Growing community of satisfied users' }
  ];

  return (
    <div className="space-y-8">
      <div className="card text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          About LivPay
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
          We're on a mission to make recharges and bill payments simple, fast, and secure for everyone. 
          Since 2023, we've been serving customers with reliable and efficient digital payment solutions.
        </p>
      </div>

      {/* Our Story */}
      <div className="card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                LivPay was born out of the frustration of lengthy recharge processes and unreliable services. 
                Our founders, experienced in fintech and telecommunications, decided to create a platform that 
                would revolutionize how people handle their mobile recharges and bill payments.
              </p>
              <p>
                What started as a simple mobile recharge app has evolved into a comprehensive platform offering 
                DTH recharges, utility bill payments, and much more. We've processed over 100,000 transactions 
                and saved our users countless hours.
              </p>
              <p>
                Today, we continue to innovate and expand our services, always keeping our users' needs at the 
                center of everything we do.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h3>
            <p className="text-lg leading-relaxed mb-8 text-gray-700">
              "To provide the fastest, most secure, and user-friendly platform for all digital payment needs, 
              making financial transactions effortless for everyone."
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Why Choose LivPay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {milestone.year}
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{milestone.event}</h4>
              <p className="text-gray-600">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="card">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Customer Support</h4>
            <p className="text-gray-600">support@rechargeapp.com</p>
            <p className="text-gray-600">1800-123-4567</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h4>
            <p className="text-gray-600">24/7 Online Support</p>
            <p className="text-gray-600">Always Available</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h4>
            <p className="text-gray-600">@RechargeApp</p>
            <p className="text-gray-600">Social Media</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default About;
