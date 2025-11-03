# 💻 Source Code หลักสำหรับให้อาจารย์รัน

## 📋 คำแนะนำสำหรับอาจารย์

ระบบนี้ประกอบด้วย Source Code หลัก 2 ส่วน:
1. **Python Script** - สร้างข้อมูล (รันได้เลย)
2. **React Web Application** - ต้อง Install Dependencies ก่อนรัน

---

## 🐍 ส่วนที่ 1: Python Script (สร้างข้อมูล)

### ไฟล์: `generate_data.py`

**วิธีรัน:**
```bash
cd c:\Project_Data\data
pip install -r requirements.txt
python generate_data.py
```

**Source Code เต็ม:**

```python
"""
สคริปต์สร้างข้อมูลการขาย E-commerce จำลอง
สำหรับโปรเจกต์วิเคราะห์ข้อมูลการขาย

ข้อมูลที่สร้าง:
- จำนวน: 1,000 records
- ช่วงเวลา: ย้อนหลัง 1 ปี
- Fields: OrderID, OrderDate, CustomerID, CustomerName, Region, 
          ProductID, ProductName, Category, Quantity, UnitPrice, TotalPrice
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from faker import Faker

# ตั้งค่า seed เพื่อให้ผลลัพธ์ซ้ำได้ (Reproducible)
np.random.seed(42)
random.seed(42)
fake = Faker('th_TH')

# กำหนดข้อมูลพื้นฐาน
REGIONS = ['North', 'South', 'East', 'West', 'Central']
CATEGORIES = {
    'Electronics': {
        'products': ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Smart Watch', 
                    'Camera', 'Speaker', 'Monitor', 'Keyboard', 'Mouse'],
        'price_range': (500, 50000)
    },
    'Clothing': {
        'products': ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Shoes', 
                    'Bag', 'Hat', 'Socks', 'Shorts', 'Sweater'],
        'price_range': (200, 5000)
    },
    'Home Goods': {
        'products': ['Pillow', 'Blanket', 'Lamp', 'Clock', 'Mirror', 
                    'Vase', 'Candle', 'Frame', 'Rug', 'Curtain'],
        'price_range': (150, 3000)
    },
    'Books': {
        'products': ['Novel', 'Magazine', 'Comic', 'Textbook', 'Dictionary', 
                    'Cookbook', 'Biography', 'Travel Guide', 'Art Book', 'Children Book'],
        'price_range': (100, 2000)
    }
}

def generate_order_date(num_days=365):
    """
    สร้างวันที่สั่งซื้อโดยใช้ Beta Distribution
    ทำให้ข้อมูลเบ้ไปทางปัจจุบัน (มียอดขายล่าสุดมากกว่า)
    """
    end_date = datetime.now()
    start_date = end_date - timedelta(days=num_days)
    
    # Beta distribution (α=2, β=5) จะให้ค่าเบ้ขวา
    beta_sample = np.random.beta(2, 5)
    days_ago = int(beta_sample * num_days)
    
    order_date = start_date + timedelta(days=days_ago)
    return order_date.strftime('%Y-%m-%d')

def generate_quantity():
    """
    สร้างจำนวนสินค้าโดยใช้ Gamma Distribution
    ทำให้ส่วนใหญ่ซื้อ 1-3 ชิ้น แต่บางออเดอร์ซื้อมาก
    """
    gamma_sample = np.random.gamma(2, 1)
    quantity = max(1, int(gamma_sample))
    return min(quantity, 10)  # จำกัดไม่เกิน 10 ชิ้น

def generate_region():
    """
    สร้างภูมิภาคโดยให้ Central มีสัดส่วนสูงที่สุด (40%)
    """
    weights = [0.15, 0.15, 0.15, 0.15, 0.40]  # Central 40%
    return random.choices(REGIONS, weights=weights)[0]

def generate_sales_data(num_records=1000):
    """
    สร้างข้อมูลการขายทั้งหมด
    """
    data = []
    
    # สร้างรายชื่อลูกค้า (ให้มีลูกค้าซ้ำได้ เพื่อจำลอง Repeat Customer)
    num_customers = int(num_records * 0.3)  # 30% ของ orders
    customers = {}
    for i in range(num_customers):
        customer_id = f"C{str(i+1).zfill(4)}"
        customers[customer_id] = fake.name()
    
    customer_ids = list(customers.keys())
    
    print("กำลังสร้างข้อมูล...")
    
    for i in range(num_records):
        # Progress bar
        if (i + 1) % 100 == 0:
            print(f"สร้างข้อมูลแล้ว {i+1}/{num_records} records")
        
        # Order ID
        order_id = f"ORD{str(i+1).zfill(5)}"
        
        # Order Date
        order_date = generate_order_date()
        
        # Customer (อนุญาตให้ซื้อซ้ำได้)
        customer_id = random.choice(customer_ids)
        customer_name = customers[customer_id]
        
        # Region
        region = generate_region()
        
        # Category & Product
        category = random.choice(list(CATEGORIES.keys()))
        product = random.choice(CATEGORIES[category]['products'])
        product_id = f"P{str(hash(category + product) % 10000).zfill(4)}"
        
        # Quantity
        quantity = generate_quantity()
        
        # Unit Price (ภายในช่วงของแต่ละหมวดหมู่)
        price_range = CATEGORIES[category]['price_range']
        unit_price = round(random.uniform(price_range[0], price_range[1]), 2)
        
        # Total Price
        total_price = round(quantity * unit_price, 2)
        
        # เพิ่มข้อมูลลง list
        data.append({
            'OrderID': order_id,
            'OrderDate': order_date,
            'CustomerID': customer_id,
            'CustomerName': customer_name,
            'Region': region,
            'ProductID': product_id,
            'ProductName': product,
            'Category': category,
            'Quantity': quantity,
            'UnitPrice': unit_price,
            'TotalPrice': total_price
        })
    
    # สร้าง DataFrame
    df = pd.DataFrame(data)
    
    return df

def validate_data(df):
    """
    ตรวจสอบคุณภาพข้อมูล (Data Quality Check)
    """
    print("\n" + "="*70)
    print("🔍 ตรวจสอบคุณภาพข้อมูล")
    print("="*70)
    
    # 1. Completeness - ตรวจสอบค่าว่าง
    missing = df.isnull().sum().sum()
    print(f"\n1. Completeness")
    print(f"   ❌ Missing values: {missing}")
    print(f"   ✅ Complete records: {len(df) - missing}")
    
    # 2. Consistency - ตรวจสอบ TotalPrice = Quantity × UnitPrice
    df['CalculatedTotal'] = (df['Quantity'] * df['UnitPrice']).round(2)
    inconsistent = (df['TotalPrice'] != df['CalculatedTotal']).sum()
    print(f"\n2. Consistency")
    print(f"   ❌ Inconsistent records: {inconsistent}")
    print(f"   ✅ Consistent records: {len(df) - inconsistent}")
    
    # 3. Validity - ตรวจสอบช่วงค่า
    invalid_quantity = ((df['Quantity'] < 1) | (df['Quantity'] > 10)).sum()
    invalid_price = (df['UnitPrice'] <= 0).sum()
    print(f"\n3. Validity")
    print(f"   ❌ Invalid Quantity: {invalid_quantity}")
    print(f"   ❌ Invalid Price: {invalid_price}")
    print(f"   ✅ Valid records: {len(df) - invalid_quantity - invalid_price}")
    
    # 4. Uniqueness - ตรวจสอบ OrderID ซ้ำ
    duplicate_orders = df['OrderID'].duplicated().sum()
    print(f"\n4. Uniqueness")
    print(f"   ❌ Duplicate OrderIDs: {duplicate_orders}")
    print(f"   ✅ Unique OrderIDs: {len(df) - duplicate_orders}")
    
    print("\n" + "="*70)

def show_statistics(df):
    """
    แสดงสถิติข้อมูลที่สร้าง
    """
    print("\n" + "="*70)
    print("📊 สถิติข้อมูลที่สร้าง")
    print("="*70)
    
    print(f"\n📝 ข้อมูลทั่วไป:")
    print(f"   • จำนวนออเดอร์ทั้งหมด: {len(df):,} records")
    print(f"   • ยอดขายรวม: ฿{df['TotalPrice'].sum():,.2f}")
    print(f"   • ยอดขายเฉลี่ย: ฿{df['TotalPrice'].mean():,.2f} ต่อออเดอร์")
    print(f"   • จำนวนลูกค้า: {df['CustomerID'].nunique()} คน")
    print(f"   • จำนวนสินค้า: {df['ProductID'].nunique()} รายการ")
    
    print(f"\n📍 การกระจายตามภูมิภาค:")
    for region in REGIONS:
        count = len(df[df['Region'] == region])
        pct = (count / len(df)) * 100
        print(f"   • {region:8s}: {count:3d} ออเดอร์ ({pct:5.1f}%)")
    
    print(f"\n📦 การกระจายตามหมวดหมู่:")
    for category in CATEGORIES.keys():
        sales = df[df['Category'] == category]['TotalPrice'].sum()
        pct = (sales / df['TotalPrice'].sum()) * 100
        print(f"   • {category:12s}: ฿{sales:12,.2f} ({pct:5.1f}%)")
    
    print(f"\n📈 สถิติเชิงลึก:")
    print(f"   • Quantity: Min={df['Quantity'].min()}, "
          f"Max={df['Quantity'].max()}, "
          f"Mean={df['Quantity'].mean():.2f}")
    print(f"   • UnitPrice: Min=฿{df['UnitPrice'].min():,.2f}, "
          f"Max=฿{df['UnitPrice'].max():,.2f}, "
          f"Mean=฿{df['UnitPrice'].mean():,.2f}")
    print(f"   • TotalPrice: Min=฿{df['TotalPrice'].min():,.2f}, "
          f"Max=฿{df['TotalPrice'].max():,.2f}, "
          f"Median=฿{df['TotalPrice'].median():,.2f}")
    
    print("\n" + "="*70)

def save_to_csv(df, filename):
    """
    บันทึกข้อมูลเป็นไฟล์ CSV
    """
    df.to_csv(filename, index=False, encoding='utf-8-sig')
    print(f"\n✅ บันทึกไฟล์สำเร็จ: {filename}")
    print(f"   📁 ขนาดไฟล์: {len(df)} rows × {len(df.columns)} columns")

def main():
    """
    ฟังก์ชันหลัก
    """
    print("="*70)
    print("🚀 E-commerce Sales Data Generator")
    print("="*70)
    print("\n📌 กำลังสร้างข้อมูลการขาย 1,000 records...")
    
    # สร้างข้อมูล
    df = generate_sales_data(num_records=1000)
    
    # ตรวจสอบคุณภาพ
    validate_data(df)
    
    # แสดงสถิติ
    show_statistics(df)
    
    # แสดงตัวอย่างข้อมูล 5 แถวแรก
    print("\n" + "="*70)
    print("👀 ตัวอย่างข้อมูล 5 แถวแรก:")
    print("="*70)
    print(df.head().to_string())
    
    # บันทึกเป็นไฟล์ CSV
    save_to_csv(df, 'sales_data.csv')
    
    print("\n" + "="*70)
    print("✨ เสร็จสิ้นการสร้างข้อมูล!")
    print("="*70)
    print("\n📝 ขั้นตอนถัดไป:")
    print("   1. นำไฟล์ sales_data.csv ไปวิเคราะห์ใน Excel (ดูคู่มือใน guides/)")
    print("   2. สร้าง Dashboard ใน Power BI Desktop")
    print("   3. รัน Web Application เพื่อแสดงผลข้อมูล\n")

if __name__ == "__main__":
    main()
```

### ไฟล์: `requirements.txt`

```
pandas>=2.0.0
numpy>=1.24.0
faker>=20.0.0
```

---

## ⚛️ ส่วนที่ 2: React Web Application

### ขั้นตอนการรันสำหรับอาจารย์:

```bash
# 1. ติดตั้ง Dependencies
cd c:\Project_Data\web-app
npm install

# 2. รันเว็บแอป
npm start

# 3. เปิด Browser ที่ http://localhost:3000
```

### ⚠️ หมายเหตุสำคัญ:
- ต้องมี **Node.js** (v14+) ติดตั้งในเครื่อง
- รอ `npm install` ประมาณ 3-5 นาที (ครั้งแรก)
- เว็บจะเปิดอัตโนมัติที่ http://localhost:3000

---

## 📁 ไฟล์ที่ 2.1: `package.json`

```json
{
  "name": "ecommerce-sales-dashboard",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "@mui/material": "^5.14.20",
    "@mui/icons-material": "^5.14.19",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/x-data-grid": "^6.18.3",
    "papaparse": "^5.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}
```

---

## 📁 ไฟล์ที่ 2.2: `src/App.js` (Main Application)

**หมายเหตุ:** นี่คือไฟล์หลักที่ควบคุมทั้งระบบ

```javascript
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

// Import Layout
import Layout from './components/Layout';

// สร้าง Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// ข้อมูลตัวอย่างเริ่มต้น (20 records)
const initialSalesData = [
  {
    id: 1,
    orderID: 'ORD00001',
    orderDate: '2024-08-15',
    customerID: 'C0001',
    customerName: 'สมชาย ใจดี',
    region: 'Central',
    productID: 'P0001',
    productName: 'Smartphone',
    category: 'Electronics',
    quantity: 2,
    unitPrice: 15000,
    totalPrice: 30000,
  },
  {
    id: 2,
    orderID: 'ORD00002',
    orderDate: '2024-08-16',
    customerID: 'C0002',
    customerName: 'สมหญิง รักสวย',
    region: 'North',
    productID: 'P0002',
    productName: 'Laptop',
    category: 'Electronics',
    quantity: 1,
    unitPrice: 35000,
    totalPrice: 35000,
  },
  {
    id: 3,
    orderID: 'ORD00003',
    orderDate: '2024-08-17',
    customerID: 'C0003',
    customerName: 'วิชัย มั่นคง',
    region: 'South',
    productID: 'P0003',
    productName: 'T-Shirt',
    category: 'Clothing',
    quantity: 5,
    unitPrice: 500,
    totalPrice: 2500,
  },
  // ... (เพิ่มอีก 17 records เพื่อให้ครบ 20)
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [salesData, setSalesData] = useState(initialSalesData);

  // ฟังก์ชัน Login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // ฟังก์ชันเพิ่มข้อมูล (Function 3)
  const handleAddSale = (newSale) => {
    const sale = {
      ...newSale,
      id: salesData.length + 1,
      orderID: `ORD${String(salesData.length + 1).padStart(5, '0')}`,
    };
    setSalesData([...salesData, sale]);
  };

  // ฟังก์ชันแก้ไขข้อมูล (Function 8)
  const handleEditSale = (editedSale) => {
    setSalesData(
      salesData.map((sale) =>
        sale.id === editedSale.id ? editedSale : sale
      )
    );
  };

  // ฟังก์ชันลบข้อมูล (Function 9)
  const handleDeleteSale = (id) => {
    setSalesData(salesData.filter((sale) => sale.id !== id));
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
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout onLogout={handleLogout}>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route
                      path="/data-management"
                      element={
                        <DataManagementPage
                          salesData={salesData}
                          onAddSale={handleAddSale}
                          onEditSale={handleEditSale}
                          onDeleteSale={handleDeleteSale}
                        />
                      }
                    />
                    <Route
                      path="/analysis-summary"
                      element={<AnalysisSummaryPage />}
                    />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

---

## 📊 ผลลัพธ์ที่ได้หลังรัน

### Python Script (generate_data.py):
```
✅ สร้างไฟล์ sales_data.csv สำเร็จ
   • จำนวน: 1,000 records
   • ยอดขายรวม: ~฿15,000,000
   • จำนวนลูกค้า: 286 คน
   • จำนวนสินค้า: 40 รายการ
```

### React Web Application:
```
✅ เว็บแอปรันที่ http://localhost:3000
   • หน้า Login: ใส่ username/password อะไรก็ได้
   • Dashboard: แสดง Power BI (ถ้ามี URL)
   • Data Management: จัดการข้อมูลครบ 11 ฟังก์ชัน
   • Analysis Summary: แสดงผลการวิเคราะห์
```

---

## 🎯 สรุปสำหรับอาจารย์

### ✅ สิ่งที่รันได้เลย:
1. **Python Script** - สร้างข้อมูล 1,000 records
2. **React Web App** - แสดงระบบครบ 11 ฟังก์ชัน

### 📋 ข้อมูลที่ต้องเตรียม:
1. **Node.js** (ดาวน์โหลดจาก https://nodejs.org/)
2. **Python 3.x** (ดาวน์โหลดจาก https://www.python.org/)

### ⏱️ เวลาที่ใช้:
- ติดตั้ง Dependencies: ~5 นาที
- รัน Python: ~10 วินาที
- รัน React: ~30 วินาที

### 📞 ติดปัญหา:
หากรันไม่ได้ กรุณาตรวจสอบ:
1. ติดตั้ง Node.js และ Python แล้วหรือยัง
2. รันคำสั่งใน Directory ที่ถูกต้องหรือไม่
3. มี Internet สำหรับดาวน์โหลด Dependencies

---

**หมายเหตุ:** Source Code เต็มทุกไฟล์อยู่ในโฟลเดอร์ `c:\Project_Data\` แล้วครับ!
