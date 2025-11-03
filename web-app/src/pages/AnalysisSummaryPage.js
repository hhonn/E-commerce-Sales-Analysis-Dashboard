/**
 * ฟังก์ชันที่ 10: Analysis Summary Page
 * แสดงสรุปผลการวิเคราะห์จาก Excel Analysis ToolPak
 */

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShowChart as ChartIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

function AnalysisSummaryPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        📊 Analysis Summary
      </Typography>

      {/* Introduction */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          📋 ภาพรวมการวิเคราะห์
        </Typography>
        <Typography variant="body1" color="text.secondary">
          สรุปผลการวิเคราะห์ข้อมูลการขาย E-commerce จากไฟล์ sales_data.csv 
          โดยใช้ Excel Analysis ToolPak ครอบคลุม 3 การวิเคราะห์หลัก: 
          Descriptive Statistics, Regression Analysis, และ Moving Average
        </Typography>
      </Paper>

      {/* ส่วนที่ 1: Descriptive Statistics */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            1. Descriptive Statistics (สถิติเชิงพรรณนา)
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          วิเคราะห์ค่าทางสถิติพื้นฐานของ <strong>TotalPrice</strong> และ <strong>Quantity</strong>
        </Typography>

        <Grid container spacing={3}>
          {/* Total Price Statistics */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  💰 Total Price Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Mean (ค่าเฉลี่ย)</strong></TableCell>
                        <TableCell align="right">฿3,458.97</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Median (ค่ากลาง)</strong></TableCell>
                        <TableCell align="right">฿2,245.50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Standard Deviation</strong></TableCell>
                        <TableCell align="right">฿2,144.50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Minimum</strong></TableCell>
                        <TableCell align="right">฿150.25</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Maximum</strong></TableCell>
                        <TableCell align="right">฿121,450.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Sum (ยอดรวม)</strong></TableCell>
                        <TableCell align="right">฿3,458,970.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Count</strong></TableCell>
                        <TableCell align="right">1,000 records</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Quantity Statistics */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  📦 Quantity Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Mean (ค่าเฉลี่ย)</strong></TableCell>
                        <TableCell align="right">2.87 ชิ้น</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Median (ค่ากลาง)</strong></TableCell>
                        <TableCell align="right">2.00 ชิ้น</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Standard Deviation</strong></TableCell>
                        <TableCell align="right">1.92</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Minimum</strong></TableCell>
                        <TableCell align="right">1 ชิ้น</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Maximum</strong></TableCell>
                        <TableCell align="right">10 ชิ้น</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Sum (ยอดรวม)</strong></TableCell>
                        <TableCell align="right">2,870 ชิ้น</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Key Insights */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            🔍 Key Insights:
          </Typography>
          <ul style={{ marginLeft: 20, lineHeight: 1.8 }}>
            <li>
              <strong>ยอดขายเฉลี่ย</strong> = ฿3,458.97 บาท/ออเดอร์ 
              แต่ <strong>Median</strong> = ฿2,245.50 (ต่ำกว่า Mean) 
              → แสดงว่าข้อมูล<Chip label="เบ้ขวา" size="small" color="warning" sx={{ ml: 1 }} />
            </li>
            <li>
              <strong>Standard Deviation สูง</strong> (฿2,144.50) 
              → ยอดขายมีความแตกต่างกันมาก (มีทั้งออเดอร์เล็กและใหญ่)
            </li>
            <li>
              <strong>จำนวนสินค้าเฉลี่ย</strong> = 2.87 ชิ้น 
              → ลูกค้าส่วนใหญ่ซื้อ 2-3 ชิ้นต่อออเดอร์
            </li>
          </ul>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* ส่วนที่ 2: Regression Analysis */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            2. Regression Analysis (การวิเคราะห์การถดถอย)
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          วิเคราะห์ความสัมพันธ์ระหว่าง <strong>Quantity (X)</strong> และ <strong>TotalPrice (Y)</strong>
        </Typography>

        {/* Regression Statistics */}
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell><strong>Statistic</strong></TableCell>
                <TableCell align="right"><strong>Value</strong></TableCell>
                <TableCell><strong>ความหมาย</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><strong>Multiple R</strong></TableCell>
                <TableCell align="right">0.458</TableCell>
                <TableCell>ค่าสัมประสิทธิ์สหสัมพันธ์ (ความสัมพันธ์เชิงบวกปานกลาง)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>R Square (R²)</strong></TableCell>
                <TableCell align="right">0.210</TableCell>
                <TableCell>Quantity อธิบาย TotalPrice ได้ 21%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>F-Statistic</strong></TableCell>
                <TableCell align="right">265.89</TableCell>
                <TableCell>โมเดลมีนัยสำคัญทางสถิติ (p &lt; 0.05)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Regression Equation */}
        <Card sx={{ bgcolor: '#fff3e0', mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📐 สมการถดถอย (Regression Equation):
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'white', 
              borderRadius: 1, 
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              textAlign: 'center'
            }}>
              <strong>TotalPrice = 2,156.84 + 453.68 × Quantity</strong>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Interpretation:</strong>
              <ul style={{ marginLeft: 20, marginTop: 8 }}>
                <li><strong>Intercept (2,156.84):</strong> ค่าคงที่เริ่มต้น</li>
                <li><strong>Slope (453.68):</strong> เมื่อซื้อเพิ่ม 1 ชิ้น → ยอดขายเพิ่ม ~454 บาท</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            🔍 Key Insights:
          </Typography>
          <ul style={{ marginLeft: 20, lineHeight: 1.8 }}>
            <li>
              <Chip label="✅ มีความสัมพันธ์" size="small" color="success" sx={{ mr: 1 }} />
              Quantity มีความสัมพันธ์เชิงบวกกับ TotalPrice อย่างมีนัยสำคัญ
            </li>
            <li>
              <strong>การซื้อเพิ่มขึ้น 1 ชิ้น</strong> → ยอดขายเพิ่มขึ้นประมาณ <strong>454 บาท</strong>
            </li>
            <li>
              <Chip label="⚠️ R² = 21%" size="small" color="warning" sx={{ mr: 1 }} />
              Quantity อธิบายยอดขายได้เพียง 21% → ปัจจัยอื่นๆ (ราคา, หมวดหมู่) มีผลมากกว่า
            </li>
            <li>
              <strong>Business Recommendation:</strong> ส่งเสริมการขายแบบชุด (Bundle) เพื่อเพิ่ม Quantity
            </li>
          </ul>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* ส่วนที่ 3: Moving Average */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ChartIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            3. Moving Average (ค่าเฉลี่ยเคลื่อนที่)
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          วิเคราะห์แนวโน้มยอดขาย (TotalPrice) แบบ <strong>7-Day Moving Average</strong>
        </Typography>

        {/* Purpose */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎯 วัตถุประสงค์:
            </Typography>
            <ul style={{ marginLeft: 20, lineHeight: 1.8 }}>
              <li>ลดความผันผวนของข้อมูลรายวัน (Smoothing)</li>
              <li>แสดงแนวโน้มระยะสั้นที่ชัดเจนขึ้น</li>
              <li>ช่วยในการตัดสินใจทางธุรกิจ (เช่น วางแผน Inventory)</li>
            </ul>
          </CardContent>
        </Card>

        {/* How to Interpret */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 การตีความกราฟ:
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Trend Pattern</strong></TableCell>
                    <TableCell><strong>ความหมาย</strong></TableCell>
                    <TableCell><strong>การตอบสนอง</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Chip label="📈 เส้น MA ลาดชันขึ้น" color="success" size="small" />
                    </TableCell>
                    <TableCell>ยอดขายมีแนวโน้มเพิ่มขึ้น</TableCell>
                    <TableCell>เพิ่ม Stock, เตรียม Promotion</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Chip label="📉 เส้น MA ลาดลง" color="error" size="small" />
                    </TableCell>
                    <TableCell>ยอดขายมีแนวโน้มลดลง</TableCell>
                    <TableCell>ลด Stock, เพิ่ม Marketing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Chip label="➡️ เส้น MA แบนราบ" color="default" size="small" />
                    </TableCell>
                    <TableCell>ยอดขายคงที่</TableCell>
                    <TableCell>รักษา Strategy ปัจจุบัน</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Box sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            🔍 Key Insights:
          </Typography>
          <ul style={{ marginLeft: 20, lineHeight: 1.8 }}>
            <li>
              <strong>7-Day MA</strong> ช่วยดูแนวโน้มระยะสั้น (1 สัปดาห์)
            </li>
            <li>
              เส้น MA <strong>นุ่มนวลกว่า</strong> Daily Sales → มองเห็น Trend ชัดเจนขึ้น
            </li>
            <li>
              สามารถใช้ <strong>ระบุ High/Low Season</strong> → วางแผน Promotion และ Inventory
            </li>
            <li>
              <strong>ช่วงที่ MA สูง:</strong> เป็น Peak Season (เช่น เทศกาล) → เพิ่ม Stock
            </li>
            <li>
              <strong>ช่วงที่ MA ต่ำ:</strong> เป็น Off Season → ทำ Promotion เพื่อกระตุ้นยอดขาย
            </li>
          </ul>
        </Box>
      </Paper>

      {/* Overall Summary */}
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'primary.light' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          📝 สรุปรวม (Overall Summary)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  📊 Descriptive Stats
                </Typography>
                <Typography variant="body2">
                  • ยอดขายเฉลี่ย: ฿3,459<br/>
                  • ข้อมูลเบ้ขวา<br/>
                  • จำนวนเฉลี่ย: 2.87 ชิ้น
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  📈 Regression
                </Typography>
                <Typography variant="body2">
                  • R² = 0.21<br/>
                  • ซื้อ +1 ชิ้น → +฿454<br/>
                  • มีความสัมพันธ์เชิงบวก
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#9c27b0' }} gutterBottom>
                  📉 Moving Average
                </Typography>
                <Typography variant="body2">
                  • ดู Trend ระยะสั้น<br/>
                  • ระบุ High/Low Season<br/>
                  • ช่วยวางแผนธุรกิจ
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AnalysisSummaryPage;
