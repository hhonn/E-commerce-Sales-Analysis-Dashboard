/**
 * E-commerce Sales Analysis Dashboard
 * Main Application Component
 * 
 * Features:
 * 1. Power BI Dashboard Embed
 * 2. Login System (UI Mockup)
 * 3. Add New Sale Entry
 * 4. Display Sales Table
 * 5. Search Functionality
 * 6. Filter by Region
 * 7. Sort Data
 * 8. Edit Data
 * 9. Delete Data
 * 10. Analysis Summary
 * 11. Export to CSV
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DataManagementPage from './pages/DataManagementPage';
import AnalysisSummaryPage from './pages/AnalysisSummaryPage';
import Layout from './components/Layout';

// Create Material-UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// Mock initial sales data (จำลองข้อมูล 20 records สำหรับ Demo)
const initialSalesData = [
  {
    OrderID: 'ORD00001',
    OrderDate: '2024-01-15',
    CustomerID: 'CUST0125',
    CustomerName: 'สมชาย ใจดี',
    Region: 'Central',
    ProductID: 'PROD001',
    ProductName: 'Smartphone Pro Max',
    Category: 'Electronics',
    Quantity: 2,
    UnitPrice: 15999.00,
    TotalPrice: 31998.00
  },
  {
    OrderID: 'ORD00002',
    OrderDate: '2024-01-16',
    CustomerID: 'CUST0087',
    CustomerName: 'สมหญิง ดีมาก',
    Region: 'North',
    ProductID: 'PROD025',
    ProductName: 'Running Shoes',
    Category: 'Clothing',
    Quantity: 1,
    UnitPrice: 1899.50,
    TotalPrice: 1899.50
  },
  {
    OrderID: 'ORD00003',
    OrderDate: '2024-02-10',
    CustomerID: 'CUST0042',
    CustomerName: 'ประยุทธ์ สุขใจ',
    Region: 'Central',
    ProductID: 'PROD015',
    ProductName: 'Coffee Maker Deluxe',
    Category: 'Home Goods',
    Quantity: 1,
    UnitPrice: 3499.00,
    TotalPrice: 3499.00
  },
  {
    OrderID: 'ORD00004',
    OrderDate: '2024-02-18',
    CustomerID: 'CUST0156',
    CustomerName: 'วิไล สวยงาม',
    Region: 'South',
    ProductID: 'PROD032',
    ProductName: 'Python Programming Guide',
    Category: 'Books',
    Quantity: 3,
    UnitPrice: 450.00,
    TotalPrice: 1350.00
  },
  {
    OrderID: 'ORD00005',
    OrderDate: '2024-03-05',
    CustomerID: 'CUST0198',
    CustomerName: 'สุรศักดิ์ เก่งกาจ',
    Region: 'East',
    ProductID: 'PROD008',
    ProductName: 'Laptop Gaming Ultra',
    Category: 'Electronics',
    Quantity: 1,
    UnitPrice: 32999.00,
    TotalPrice: 32999.00
  },
  {
    OrderID: 'ORD00006',
    OrderDate: '2024-03-12',
    CustomerID: 'CUST0073',
    CustomerName: 'มานี รักเรียน',
    Region: 'Central',
    ProductID: 'PROD021',
    ProductName: 'Denim Jeans',
    Category: 'Clothing',
    Quantity: 2,
    UnitPrice: 899.00,
    TotalPrice: 1798.00
  },
  {
    OrderID: 'ORD00007',
    OrderDate: '2024-04-08',
    CustomerID: 'CUST0234',
    CustomerName: 'ธนา มีเงิน',
    Region: 'West',
    ProductID: 'PROD004',
    ProductName: 'Wireless Earbuds Premium',
    Category: 'Electronics',
    Quantity: 2,
    UnitPrice: 4599.00,
    TotalPrice: 9198.00
  },
  {
    OrderID: 'ORD00008',
    OrderDate: '2024-04-20',
    CustomerID: 'CUST0111',
    CustomerName: 'สุดา ใจบุญ',
    Region: 'Central',
    ProductID: 'PROD017',
    ProductName: 'Air Purifier HEPA',
    Category: 'Home Goods',
    Quantity: 1,
    UnitPrice: 5999.00,
    TotalPrice: 5999.00
  },
  {
    OrderID: 'ORD00009',
    OrderDate: '2024-05-03',
    CustomerID: 'CUST0067',
    CustomerName: 'ชาย ว่องไว',
    Region: 'North',
    ProductID: 'PROD027',
    ProductName: 'Sports Leggings',
    Category: 'Clothing',
    Quantity: 3,
    UnitPrice: 699.00,
    TotalPrice: 2097.00
  },
  {
    OrderID: 'ORD00010',
    OrderDate: '2024-05-15',
    CustomerID: 'CUST0189',
    CustomerName: 'พิมพ์ สวยสด',
    Region: 'South',
    ProductID: 'PROD036',
    ProductName: 'Data Science Handbook',
    Category: 'Books',
    Quantity: 1,
    UnitPrice: 890.00,
    TotalPrice: 890.00
  },
  {
    OrderID: 'ORD00011',
    OrderDate: '2024-06-07',
    CustomerID: 'CUST0145',
    CustomerName: 'อนุชา ขยัน',
    Region: 'East',
    ProductID: 'PROD005',
    ProductName: 'Smart Watch Series 5',
    Category: 'Electronics',
    Quantity: 1,
    UnitPrice: 8999.00,
    TotalPrice: 8999.00
  },
  {
    OrderID: 'ORD00012',
    OrderDate: '2024-06-18',
    CustomerID: 'CUST0092',
    CustomerName: 'วันดี มีสุข',
    Region: 'Central',
    ProductID: 'PROD019',
    ProductName: 'Blender Pro 1200W',
    Category: 'Home Goods',
    Quantity: 1,
    UnitPrice: 2799.00,
    TotalPrice: 2799.00
  },
  {
    OrderID: 'ORD00013',
    OrderDate: '2024-07-10',
    CustomerID: 'CUST0221',
    CustomerName: 'สมพร สุขสันต์',
    Region: 'West',
    ProductID: 'PROD023',
    ProductName: 'Winter Jacket',
    Category: 'Clothing',
    Quantity: 1,
    UnitPrice: 2499.00,
    TotalPrice: 2499.00
  },
  {
    OrderID: 'ORD00014',
    OrderDate: '2024-07-25',
    CustomerID: 'CUST0158',
    CustomerName: 'ประภา งามสง่า',
    Region: 'Central',
    ProductID: 'PROD002',
    ProductName: '4K Smart TV 55"',
    Category: 'Electronics',
    Quantity: 1,
    UnitPrice: 18999.00,
    TotalPrice: 18999.00
  },
  {
    OrderID: 'ORD00015',
    OrderDate: '2024-08-12',
    CustomerID: 'CUST0076',
    CustomerName: 'บุญมี มากมาย',
    Region: 'North',
    ProductID: 'PROD038',
    ProductName: 'Business Strategy 101',
    Category: 'Books',
    Quantity: 2,
    UnitPrice: 650.00,
    TotalPrice: 1300.00
  },
  {
    OrderID: 'ORD00016',
    OrderDate: '2024-08-28',
    CustomerID: 'CUST0203',
    CustomerName: 'ณัฐพล เด่นดี',
    Region: 'South',
    ProductID: 'PROD016',
    ProductName: 'Vacuum Cleaner Robot',
    Category: 'Home Goods',
    Quantity: 1,
    UnitPrice: 7499.00,
    TotalPrice: 7499.00
  },
  {
    OrderID: 'ORD00017',
    OrderDate: '2024-09-05',
    CustomerID: 'CUST0134',
    CustomerName: 'สุภาพร งามล้ำ',
    Region: 'East',
    ProductID: 'PROD029',
    ProductName: 'Casual Sneakers',
    Category: 'Clothing',
    Quantity: 1,
    UnitPrice: 1599.00,
    TotalPrice: 1599.00
  },
  {
    OrderID: 'ORD00018',
    OrderDate: '2024-09-20',
    CustomerID: 'CUST0167',
    CustomerName: 'อรรถพล ทันสมัย',
    Region: 'Central',
    ProductID: 'PROD007',
    ProductName: 'Gaming Mouse RGB',
    Category: 'Electronics',
    Quantity: 2,
    UnitPrice: 1299.00,
    TotalPrice: 2598.00
  },
  {
    OrderID: 'ORD00019',
    OrderDate: '2024-10-08',
    CustomerID: 'CUST0245',
    CustomerName: 'ชุติมา รักสวย',
    Region: 'West',
    ProductID: 'PROD022',
    ProductName: 'Rice Cooker Smart',
    Category: 'Home Goods',
    Quantity: 1,
    UnitPrice: 1899.00,
    TotalPrice: 1899.00
  },
  {
    OrderID: 'ORD00020',
    OrderDate: '2024-10-22',
    CustomerID: 'CUST0089',
    CustomerName: 'วิทยา ฉลาด',
    Region: 'Central',
    ProductID: 'PROD040',
    ProductName: 'Machine Learning Basics',
    Category: 'Books',
    Quantity: 1,
    UnitPrice: 950.00,
    TotalPrice: 950.00
  }
];

function App() {
  // State Management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [salesData, setSalesData] = useState(initialSalesData);

  // ฟังก์ชันที่ 2: Login Handler
  const handleLogin = (username, password) => {
    // Mock login - ในระบบจริงต้องเชื่อมกับ Backend API
    if (username && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // ฟังก์ชันที่ 3: Add New Sale
  const handleAddSale = (newSale) => {
    setSalesData([...salesData, newSale]);
  };

  // ฟังก์ชันที่ 8: Edit Sale
  const handleEditSale = (updatedSale) => {
    setSalesData(salesData.map(sale => 
      sale.OrderID === updatedSale.OrderID ? updatedSale : sale
    ));
  };

  // ฟังก์ชันที่ 9: Delete Sale
  const handleDeleteSale = (orderId) => {
    setSalesData(salesData.filter(sale => sale.OrderID !== orderId));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login Route */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <LoginPage onLogin={handleLogin} />
            } 
          />
          
          {/* Protected Routes with Layout */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Layout onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            }
          >
            {/* ฟังก์ชันที่ 1: Dashboard with Power BI Embed */}
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* ฟังก์ชันที่ 3-9: Data Management (Add, View, Search, Filter, Sort, Edit, Delete) */}
            <Route 
              path="data-management" 
              element={
                <DataManagementPage 
                  salesData={salesData}
                  onAddSale={handleAddSale}
                  onEditSale={handleEditSale}
                  onDeleteSale={handleDeleteSale}
                />
              } 
            />
            
            {/* ฟังก์ชันที่ 10: Analysis Summary */}
            <Route 
              path="analysis-summary" 
              element={<AnalysisSummaryPage />} 
            />
          </Route>
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
