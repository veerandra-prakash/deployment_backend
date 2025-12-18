import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Smartphone, Tv, CreditCard, History, User, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const Dashboard = () => {
  const {
    userStats,
    getRecentTransactions,
    getMonthlyData,
    transactions,
    products,
    productsLoading,
    token,
  } = useUser();
  
  // Safe data extraction with defaults
  const safeUserStats = userStats || {
    totalRecharges: 0,
    totalSpent: 0,
    thisMonth: 0,
    savedAmount: 0,
  };
  
  const safeTransactions = transactions || [];
  const safeGetRecentTransactions = getRecentTransactions || (() => []);
  const safeGetMonthlyData = getMonthlyData || (() => []);
  
  const recentTransactions = safeGetRecentTransactions(3).map(t => ({
    id: t.id || 'N/A',
    type: t.type?.includes('Mobile') ? 'Mobile' : t.type?.includes('DTH') ? 'DTH' : 'Bill',
    operator: t.operator || 'N/A',
    amount: t.amount || 0,
    date: t.date?.split(' ')[0] || 'N/A',
    status: t.status || 'Pending'
  }));

  const monthlyData = safeGetMonthlyData();

  const getTransactionCount = (type) => {
    if (!safeTransactions || !Array.isArray(safeTransactions)) return 0;
    return safeTransactions.filter(t => 
      t?.type?.includes(type) && t?.status === 'Success'
    ).length;
  };

  const quickActions = [
    { title: 'Mobile Recharge', icon: Smartphone, link: '/mobile-recharge', count: getTransactionCount('Mobile') },
    { title: 'DTH Recharge', icon: Tv, link: '/dth-recharge', count: getTransactionCount('DTH') },
    { title: 'Bill Payment', icon: CreditCard, link: '/bill-payment', count: getTransactionCount('Bill') }
  ];

  // Always render - never blank page
  return (
    <div className="space-y-6" style={{ minHeight: '100%', width: '100%' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <BarChart3 size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Smartphone size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{safeUserStats.totalRecharges || 0}</div>
          <div className="text-gray-600 font-medium">Total Recharges</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{(safeUserStats.totalSpent || 0).toLocaleString()}</div>
          <div className="text-gray-600 font-medium">Total Spent</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{(safeUserStats.thisMonth || 0).toLocaleString()}</div>
          <div className="text-gray-600 font-medium">This Month</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">₹{safeUserStats.savedAmount || 0}</div>
          <div className="text-gray-600 font-medium">Cashback Earned</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link 
                  key={index} 
                  to={action.link}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.count} transactions</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
            <Link to="/history" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions && Array.isArray(recentTransactions) && recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id || `txn-${Math.random()}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{transaction.type || 'N/A'} - {transaction.operator || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{transaction.date || 'N/A'}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹{transaction.amount || 0}</div>
                    <div className="text-sm text-gray-600">{transaction.status || 'Pending'}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No recent transactions</div>
            )}
          </div>
        </div>
      </div>

        {/* Monthly Spending Chart */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Spending</h3>
        <div className="flex items-end justify-between h-48 gap-4">
          {monthlyData && Array.isArray(monthlyData) && monthlyData.length > 0 ? (
            monthlyData.map((data, index) => {
              try {
                const amounts = monthlyData.map(d => (d && typeof d === 'object' && d.amount) ? d.amount : 0);
                const maxAmount = Math.max(...amounts, 1);
                const dataAmount = (data && typeof data === 'object' && data.amount) ? data.amount : 0;
                const height = maxAmount > 0 ? (dataAmount / maxAmount) * 100 : 0;
                return (
                  <div key={index || `month-${index}`} className="flex-1 flex flex-col items-center">
                    <div className="text-sm font-medium text-gray-900 mb-2">₹{dataAmount}</div>
                    <div 
                      className="w-full bg-gray-900 rounded-t-lg transition-all duration-500"
                      style={{ height: `${Math.max(height, 4)}%`, minHeight: '4px' }}
                    ></div>
                    <div className="text-sm text-gray-600 mt-2">{data?.month || 'N/A'}</div>
                  </div>
                );
              } catch (err) {
                console.error("Chart rendering error:", err);
                return null;
              }
            })
          ) : (
            <div className="w-full text-center text-gray-500 py-8">No spending data available</div>
          )}
        </div>
      </div>

      {/* Usage Insights */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Usage Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('Mobile')}</div>
            <div className="text-gray-600">Mobile Recharges</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-900 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('Mobile') * 10)}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('DTH')}</div>
            <div className="text-gray-600">DTH Recharges</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('DTH') * 10)}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{getTransactionCount('Bill')}</div>
            <div className="text-gray-600">Bill Payments</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${Math.min(100, getTransactionCount('Bill') * 10)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Products (Backend)
          </h3>
          {!token && (
            <span className="text-sm text-gray-500">
              Login to load products from the API
            </span>
          )}
        </div>
        {productsLoading && <p className="text-sm text-gray-700">Loading...</p>}
        {!productsLoading && products.length === 0 && token && (
          <p className="text-sm text-gray-700">
            No products found. Add some via the backend (admin required).
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id || Math.random()}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {product.name || 'Unnamed Product'}
                  </div>
                  <div className="text-sm text-gray-600">
                    ID: {product._id ? product._id.slice(-6) : 'N/A'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ₹{product.price || 0}
                  </div>
                  <div className="text-xs text-gray-500">MongoDB</div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-4">
              No products available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;