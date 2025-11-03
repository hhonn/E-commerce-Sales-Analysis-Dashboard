/**
 * ฟังก์ชันที่ 1: Dashboard Page with Power BI Embed
 * แสดง Power BI Dashboard แบบ Embedded
 */

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';

function DashboardPage() {
  // Power BI Embed URL - ✅ ใส่ URL จาก Power BI Service แล้ว
  const powerBIEmbedUrl = "https://app.powerbi.com/view?r=eyJrIjoiNzI1MGEyZDktMTE0ZC00NjAxLWEwZTAtMDJjY2RmMGU4ODFlIiwidCI6ImZkMjA2NzE1LTc1MDktNGFlNS05Yjk2LTc2YmI5Nzg4NmE4NCIsImMiOjEwfQ%3D%3D";
  
  // ตรวจสอบว่ามี URL หรือยัง
  const hasPowerBIUrl = powerBIEmbedUrl && powerBIEmbedUrl !== "YOUR_POWER_BI_EMBED_URL_HERE";

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        📊 Sales Dashboard
      </Typography>

      {/* คำแนะนำการใช้งาน */}
      {!hasPowerBIUrl && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>📌 วิธีเพิ่ม Power BI Dashboard</AlertTitle>
          <ol style={{ marginLeft: 20, marginTop: 10 }}>
            <li>สร้าง Dashboard ใน Power BI Desktop ตามคู่มือ</li>
            <li>Publish ไปยัง Power BI Service</li>
            <li>สร้าง Public Embed Link (Publish to web)</li>
            <li>Copy URL และแทนที่ใน <code>DashboardPage.js</code> ที่บรรทัด 14</li>
            <li>Restart เซิร์ฟเวอร์ (<code>npm start</code>)</li>
          </ol>
        </Alert>
      )}

      {/* Power BI Embedded iframe */}
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        {hasPowerBIUrl ? (
          <Box
            sx={{
              position: 'relative',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
              width: '100%',
            }}
          >
            <iframe
              title="E-commerce Sales Dashboard"
              src={powerBIEmbedUrl}
              frameBorder="0"
              allowFullScreen={true}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        ) : (
          // Placeholder Dashboard (แสดงก่อนใส่ Power BI URL)
          <Box
            sx={{
              height: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f5f5f5',
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom color="text.secondary">
              📈 Power BI Dashboard Placeholder
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Dashboard จะแสดงที่นี่หลังจาก Publish Power BI และใส่ Embed URL
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              (ดูคำแนะนำด้านบน)
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Dashboard Features Summary */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          📋 Dashboard Features:
        </Typography>
        <Paper sx={{ p: 3 }}>
          <ul style={{ marginLeft: 20, lineHeight: 1.8 }}>
            <li>💰 <strong>KPI Cards:</strong> Total Sales, Total Orders, Avg Sale per Order</li>
            <li>📈 <strong>Line Chart:</strong> Monthly Sales Trend</li>
            <li>🌍 <strong>Bar Chart:</strong> Top 5 Regions by Sales</li>
            <li>📦 <strong>Pie Chart:</strong> Sales Distribution by Category</li>
            <li>🏆 <strong>Table:</strong> Top 10 Best-Selling Products</li>
            <li>🔍 <strong>Interactive Filters:</strong> Region, Category, Date Range</li>
          </ul>
        </Paper>
      </Box>
    </Box>
  );
}

export default DashboardPage;
