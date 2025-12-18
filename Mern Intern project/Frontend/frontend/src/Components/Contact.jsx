import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '1800-123-4567',
      description: 'Call us for immediate assistance',
      color: '#1f2937'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@rechargeapp.com',
      description: 'Send us your queries via email',
      color: '#374151'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Chat with our support team',
      color: '#4b5563'
    },
    {
      icon: HeadphonesIcon,
      title: 'Help Center',
      details: 'FAQ & Guides',
      description: 'Find answers to common questions',
      color: '#6b7280'
    }
  ];

  const faqs = [
    {
      question: 'How long does a recharge take?',
      answer: 'Most recharges are processed instantly within 30 seconds. In rare cases, it may take up to 5 minutes.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use bank-grade SSL encryption and secure payment gateways to protect your information.'
    },
    {
      question: 'What if my recharge fails?',
      answer: 'If a recharge fails, the amount is automatically refunded to your account within 24 hours.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Refunds are processed for failed transactions only. Successful recharges cannot be refunded as per telecom regulations.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="card text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
          We're here to help! Reach out to us through any of the channels below or send us a message.
        </p>
      </div>

      {submitted && (
        <div className="bg-gray-100 border border-gray-400 text-gray-800 px-4 py-3 rounded-lg mb-6">
          Thank you for contacting us! We'll get back to you within 24 hours.
        </div>
      )}

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div key={index} className="card text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: method.color }}
              >
                <Icon size={30} />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{method.title}</h4>
              <div 
                className="font-bold mb-2"
                style={{ color: method.color }}
              >
                {method.details}
              </div>
              <p className="text-gray-600 text-sm">
                {method.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input text-xl h-16"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input text-lg h-14"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Subject *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="input text-lg h-14"
                required
              >
                <option value="">Select a subject</option>
                <option value="recharge-issue">Recharge Issue</option>
                <option value="payment-problem">Payment Problem</option>
                <option value="account-query">Account Query</option>
                <option value="feature-request">Feature Request</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-800 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="input min-h-[140px] resize-none text-lg"
                rows="6"
                placeholder="Describe your issue or inquiry in detail..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full h-16 text-xl font-black">
              <Send size={22} />
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ & Info */}
        <div className="space-y-6">
          {/* Business Hours */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Clock size={24} className="text-gray-600" />
              Business Hours
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div>
                <div className="font-semibold text-gray-800">Customer Support:</div>
                <div className="text-gray-600 mt-1">24/7 - Always Available</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Phone Support:</div>
                <div className="text-gray-600 mt-1">Mon-Sun: 8:00 AM - 10:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Email Response:</div>
                <div className="text-gray-600 mt-1">Within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Office Location */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <MapPin size={24} className="text-gray-600" />
              Office Location
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="font-semibold text-gray-800 mb-3">
                LivPay Headquarters
              </div>
              <div className="text-gray-600 leading-relaxed">
                123 Tech Park, Electronic City<br />
                Bangalore, Karnataka - 560100<br />
                India
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="cursor-pointer font-medium text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    {faq.question}
                  </summary>
                  <div className="mt-2 p-4 text-gray-600 text-sm leading-relaxed bg-white border border-gray-200 rounded-lg">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
