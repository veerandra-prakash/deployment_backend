import { useState } from 'react';
import { History, Download, Filter, Search, Check, X, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import jsPDF from 'jspdf';

const TransactionHistory = () => {
  const { transactions } = useUser();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');

  const allTransactions = [
    ...transactions,
    {
      id: 'TXN006',
      type: 'Mobile Recharge',
      number: '9876543210',
      operator: 'Vi',
      amount: 149,
      status: 'Pending',
      date: '2024-12-15 13:45',
      method: 'UPI'
    },
    {
      id: 'TXN007',
      type: 'DTH Recharge',
      number: '1234567890',
      operator: 'Dish TV',
      amount: 399,
      status: 'Success',
      date: '2024-12-14 08:15',
      method: 'Wallet'
    },
    {
      id: 'TXN008',
      type: 'Gas Bill',
      number: 'GB456789123',
      operator: 'Indane Gas',
      amount: 650,
      status: 'Success',
      date: '2024-12-13 17:20',
      method: 'Net Banking'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <Check size={16} className="text-gray-800" />;
      case 'Failed':
        return <X size={16} className="text-gray-600" />;
      case 'Pending':
        return <Clock size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return '#1f2937';
      case 'Failed':
        return '#4b5563';
      case 'Pending':
        return '#6b7280';
      default:
        return '#666';
    }
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.status.toLowerCase() === filter;
    const matchesSearch = transaction.number.includes(searchTerm) || 
                         transaction.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + t.amount, 0);

  const downloadStatement = () => {
    try {
      if (!jsPDF) {
        throw new Error('jsPDF library not available');
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const maxWidth = pageWidth - (margin * 2);
      
      // Helper function to safely format date
      const formatDate = (dateString) => {
        try {
          if (!dateString) return 'N/A';
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return dateString;
          return date.toLocaleString('en-IN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        } catch (e) {
          return dateString || 'N/A';
        }
      };

      // Helper function to split long text into multiple lines
      const splitText = (text, maxWidth) => {
        if (!text) return [''];
        const textStr = String(text);
        
        // Simple character-based splitting if getTextWidth is not available
        try {
          if (typeof doc.getTextWidth === 'function') {
            const words = textStr.split(' ');
            const lines = [];
            let currentLine = '';

            words.forEach(word => {
              const testLine = currentLine + (currentLine ? ' ' : '') + word;
              const textWidth = doc.getTextWidth(testLine);
              
              if (textWidth > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            });
            
            if (currentLine) {
              lines.push(currentLine);
            }
            
            return lines.length > 0 ? lines : [textStr];
          }
        } catch (e) {
          // Fallback to character-based splitting
        }
        
        // Fallback: simple character count-based splitting
        const charLimit = Math.floor(maxWidth / 2); // Rough estimate
        if (textStr.length <= charLimit) {
          return [textStr];
        }
        
        const lines = [];
        for (let i = 0; i < textStr.length; i += charLimit) {
          lines.push(textStr.substring(i, i + charLimit));
        }
        return lines;
      };

      // Title
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text('LivPay - Transaction History', margin, 20);
      
      // Date generated
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const generatedDate = new Date().toLocaleString('en-IN');
      doc.text(`Generated on: ${generatedDate}`, margin, 28);

      // Summary
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      const summaryY = 36;
      doc.text('Summary', margin, summaryY);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const summaryLines = [
        `Total Transactions: ${filteredTransactions.length}`,
        `Successful: ${filteredTransactions.filter(t => t.status === 'Success').length}`,
        `Failed: ${filteredTransactions.filter(t => t.status === 'Failed').length}`,
        `Pending: ${filteredTransactions.filter(t => t.status === 'Pending').length}`,
        `Total Amount: ₹${totalAmount.toLocaleString('en-IN')}`
      ];
      
      let y = summaryY + 8;
      summaryLines.forEach(line => {
        doc.text(line, margin + 5, y);
        y += 6;
      });

      // Table headers
      y += 4;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      
      // Draw header background
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, y - 5, pageWidth - (margin * 2), 8, 'F');
      
      const headers = ['ID', 'Type', 'Number', 'Operator', 'Amount', 'Status', 'Date', 'Method'];
      const colWidths = [25, 30, 30, 25, 25, 20, 35, 25];
      let x = margin;
      
      headers.forEach((header, index) => {
        doc.text(header, x + 2, y);
        x += colWidths[index];
      });
      
      y += 8;
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageWidth - margin, y);
      y += 3;

      // Table rows
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      
      if (filteredTransactions.length === 0) {
        doc.setFontSize(10);
        doc.text('No transactions found', margin, y);
      } else {
        filteredTransactions.forEach((t, index) => {
          // Check if we need a new page
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
            
            // Redraw headers on new page
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10);
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, y - 5, pageWidth - (margin * 2), 8, 'F');
            x = margin;
            headers.forEach((header, idx) => {
              doc.text(header, x + 2, y);
              x += colWidths[idx];
            });
            y += 8;
            doc.line(margin, y, pageWidth - margin, y);
            y += 3;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
          }

          // Format transaction data safely
          const rowData = [
            String(t.id || 'N/A').substring(0, 8),
            String(t.type || 'N/A').substring(0, 12),
            String(t.number || 'N/A').substring(0, 12),
            String(t.operator || 'N/A').substring(0, 10),
            `₹${(t.amount || 0).toLocaleString('en-IN')}`,
            String(t.status || 'N/A').substring(0, 8),
            formatDate(t.date).substring(0, 15),
            String(t.method || 'N/A').substring(0, 10)
          ];

          // Draw row background for alternating rows
          if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(margin, y - 4, pageWidth - (margin * 2), 6, 'F');
          }

          // Draw row data
          x = margin;
          rowData.forEach((cell, cellIndex) => {
            const cellText = splitText(cell, colWidths[cellIndex] - 2)[0];
            doc.text(cellText, x + 1, y);
            x += colWidths[cellIndex];
          });

          y += 6;
          
          // Draw row separator
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, y - 1, pageWidth - margin, y - 1);
        });
      }

      // Footer
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - margin - 20,
          pageHeight - 10
        );
      }

      // Save PDF
      const fileName = `livpay-transaction-history-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or check the console for details.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-900 p-3 rounded-lg">
          <History size={24} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transaction History</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem' }}>
            {filteredTransactions.length}
          </div>
          <div className="stats-label">Total Transactions</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem', color: '#1f2937' }}>
            {filteredTransactions.filter(t => t.status === 'Success').length}
          </div>
          <div className="stats-label">Successful</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '2rem', color: '#4b5563' }}>
            {filteredTransactions.filter(t => t.status === 'Failed').length}
          </div>
          <div className="stats-label">Failed</div>
        </div>
        <div className="card stats-card">
          <div className="stats-number" style={{ fontSize: '1.5rem', color: '#374151' }}>
            ₹{totalAmount.toLocaleString()}
          </div>
          <div className="stats-label">Total Amount</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by number, operator, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input text-lg h-14 pl-12"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input text-lg h-14 flex-1"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            <button onClick={downloadStatement} className="btn btn-secondary h-14 px-6">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Transactions</h3>
        
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <History size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
            <h4>No transactions found</h4>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Transaction ID</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Number</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Operator</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontWeight: '600' }}>Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    style={{ 
                      borderBottom: '1px solid #eee',
                      background: index % 2 === 0 ? '#f9f9f9' : 'white'
                    }}
                  >
                    <td style={{ padding: '15px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {transaction.id}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '500' }}>
                      {transaction.type}
                    </td>
                    <td style={{ padding: '15px', fontFamily: 'monospace' }}>
                      {transaction.number}
                    </td>
                    <td style={{ padding: '15px' }}>
                      {transaction.operator}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        color: getStatusColor(transaction.status),
                        fontWeight: '500'
                      }}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </div>
                    </td>
                    <td style={{ padding: '15px', fontSize: '0.9rem', color: '#666' }}>
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {transaction.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;