# 🛒 E-commerce Sales Analysis Dashboard - Web Application

## 📋 Overview

Full-stack Web Application สำหรับวิเคราะห์และจัดการข้อมูลการขาย E-commerce พร้อมฟีเจอร์ครบครัน 11+ ฟังก์ชัน

## ✨ Features (11+ Functions)

### Core Features:
1. ✅ **Power BI Dashboard Embed** - แสดง Interactive Dashboard
2. ✅ **Login System** - Mock Authentication UI
3. ✅ **Add New Sale** - เพิ่มข้อมูลการขายใหม่
4. ✅ **Display Data Table** - แสดงตารางข้อมูลทั้งหมด
5. ✅ **Search** - ค้นหาข้อมูลจาก Customer หรือ Product
6. ✅ **Filter by Region** - กรองข้อมูลตามภูมิภาค
7. ✅ **Sort Data** - เรียงลำดับข้อมูลตามคอลัมน์ต่างๆ
8. ✅ **Edit Data** - แก้ไขข้อมูลแบบ In-line
9. ✅ **Delete Data** - ลบข้อมูลพร้อม Confirmation
10. ✅ **Analysis Summary** - แสดงผลสรุปการวิเคราะห์จาก Excel
11. ✅ **Export to CSV** - Export ข้อมูลที่กรองแล้วเป็น CSV

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18
- **UI Library**: Material-UI (MUI) v5
- **Data Grid**: MUI X Data Grid
- **Routing**: React Router v6
- **CSV Processing**: PapaParse
- **Charts**: Recharts (Optional)

## 📁 Project Structure

```
web-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout.js              # Navigation & Sidebar
│   ├── pages/
│   │   ├── LoginPage.js           # Login UI (Function 2)
│   │   ├── DashboardPage.js       # Power BI Embed (Function 1)
│   │   ├── DataManagementPage.js  # CRUD Operations (Functions 3-9, 11)
│   │   └── AnalysisSummaryPage.js # Analysis Results (Function 10)
│   ├── App.js                     # Main App Component
│   ├── index.js                   # Entry Point
│   └── index.css                  # Global Styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm (มาพร้อม Node.js)

### Installation

1. **Navigate to web-app directory**:
   ```powershell
   cd c:\Project_Data\web-app
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Start development server**:
   ```powershell
   npm start
   ```

4. **Open browser**:
   - URL: [http://localhost:3000](http://localhost:3000)
   - Login: ใส่ Username/Password อะไรก็ได้ (Mock Login)

### Build for Production

```powershell
npm run build
```

ไฟล์ที่ Build เสร็จจะอยู่ในโฟลเดอร์ `build/`

## 📊 How to Add Power BI Dashboard

1. **Create Dashboard** in Power BI Desktop (see `guides/03_PowerBI_Dashboard_Guide.md`)
2. **Publish** to Power BI Service
3. **Generate Public Embed Link** (Publish to web)
4. **Copy the URL** (starts with `https://app.powerbi.com/view?r=...`)
5. **Edit** `src/pages/DashboardPage.js` line 14:
   ```javascript
   const powerBIEmbedUrl = "YOUR_POWER_BI_URL_HERE";
   ```
6. **Restart** the app (`npm start`)

## 🎯 Pages Overview

### 1. Login Page (`/login`)
- Mock authentication system
- Username & Password fields
- Redirect to Dashboard after login

### 2. Dashboard (`/dashboard`)
- Power BI Dashboard embedded
- Interactive charts and KPIs
- Responsive design

### 3. Data Management (`/data-management`)
- **Add**: Dialog form to add new sale entry
- **View**: DataGrid table with all sales data
- **Search**: Filter by Customer Name or Product Name
- **Filter**: Dropdown to filter by Region
- **Sort**: Click column headers to sort
- **Edit**: Click edit icon to modify data
- **Delete**: Click delete icon with confirmation
- **Export**: Button to download filtered data as CSV

### 4. Analysis Summary (`/analysis-summary`)
- Descriptive Statistics summary
- Regression Analysis results
- Moving Average interpretation
- Business insights

## 🎨 Design Highlights

- **Modern UI**: Material Design components
- **Responsive**: Works on Desktop, Tablet, Mobile
- **Color Scheme**: Professional blue (#1976d2)
- **Typography**: Roboto font family
- **Icons**: Material Icons
- **Dark Mode**: Can be enabled (optional)

## 📱 Responsive Design

- ✅ Desktop (>= 1200px): Full sidebar + main content
- ✅ Tablet (768px - 1199px): Collapsible sidebar
- ✅ Mobile (< 768px): Hamburger menu

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App |

## 🚀 Deployment

See `guides/04_Deployment_Guide.md` for detailed deployment instructions.

### Quick Deploy to Netlify:

1. Build the project:
   ```powershell
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/)

3. Drag & drop the `build/` folder

4. Get your public URL!

## 📝 Mock Data

The app comes with 20 pre-loaded sales records for demonstration. Data is stored in React state (not persistent).

To load real data from `sales_data.csv`:
1. Import the CSV file
2. Parse with PapaParse
3. Update `initialSalesData` in `App.js`

## 🎓 Educational Value

This project demonstrates:
- ✅ React Hooks (useState, useMemo)
- ✅ React Router for navigation
- ✅ Material-UI components
- ✅ CRUD operations
- ✅ Data filtering & sorting
- ✅ CSV export functionality
- ✅ Responsive design patterns
- ✅ Component architecture

## 🐛 Troubleshooting

### Issue: "Module not found"
```powershell
npm install
```

### Issue: Port 3000 already in use
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3001; npm start
```

### Issue: Build fails
```powershell
# Clear cache
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run build
```

## 📚 Documentation

- [Data Generation Guide](../guides/01_Data_Generation_Guide.md)
- [Excel Analysis Guide](../guides/02_Excel_Analysis_Guide.md)
- [Power BI Dashboard Guide](../guides/03_PowerBI_Dashboard_Guide.md)
- [Deployment Guide](../guides/04_Deployment_Guide.md)

## 🤝 Contributing

This is a student project for educational purposes. Feel free to:
- Fork the repository
- Modify for your own use
- Learn from the code

## 📄 License

MIT License - Free to use for educational purposes

## 👨‍💻 Author

Student Project - Data Analytics & Visualization Course

## 🎉 Acknowledgments

- Material-UI for beautiful components
- Power BI for amazing data visualization
- React team for the framework
- All open-source contributors

---

**Happy Coding! 💻✨**
