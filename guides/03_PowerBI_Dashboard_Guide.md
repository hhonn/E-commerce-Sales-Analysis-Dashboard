# คู่มือการสร้าง Dashboard ด้วย Power BI Desktop

## 📋 ภาพรวม

เอกสารนี้แนะนำทีละขั้นตอนในการสร้าง **Interactive Dashboard** จากข้อมูล sales_data.csv ด้วย Power BI Desktop และการ Publish ไปยัง Power BI Service

---

## 🎯 Dashboard ที่จะสร้าง

Dashboard นี้จะประกอบด้วย:

1. **KPI Cards** (3 ตัว): Total Sales, Total Orders, Avg Sale per Order
2. **Line Chart**: แนวโน้มยอดขายรายเดือน
3. **Bar Chart**: Top 5 Regions ตามยอดขาย
4. **Pie Chart**: สัดส่วนยอดขายตาม Category
5. **Table**: Top 10 สินค้าขายดี
6. **Slicers/Filters**: กรองตาม Region, Category, Date Range

---

## 🛠️ ขั้นตอนเตรียมการ

### 1. ดาวน์โหลดและติดตั้ง Power BI Desktop

1. ไปที่: [https://powerbi.microsoft.com/downloads/](https://powerbi.microsoft.com/downloads/)
2. ดาวน์โหลด **Power BI Desktop** (ฟรี)
3. ติดตั้งตามขั้นตอน (Next → Next → Install)
4. เปิดโปรแกรม Power BI Desktop

---

### 2. สมัคร Power BI Service (สำหรับ Publish)

1. ไปที่: [https://app.powerbi.com/](https://app.powerbi.com/)
2. คลิก **Sign up free** หรือ **Try free**
3. ใช้อีเมล Microsoft Account (หรือสร้างใหม่)
4. ยืนยันอีเมลและเข้าสู่ระบบ

**หมายเหตุ**: นักศึกษาสามารถใช้อีเมล .edu เพื่อสมัคร Power BI Pro ฟรี

---

## 📊 ส่วนที่ 1: Import ข้อมูลเข้า Power BI

### ขั้นตอนการ Import:

1. **เปิด Power BI Desktop**

2. **Get Data**:
   - หน้าแรก (Home Tab) → คลิก **Get data**
   - หรือ **Home** → **Get Data** → **Text/CSV**

3. **เลือกไฟล์**:
   - เลือกไฟล์ `sales_data.csv`
   - คลิก **Open**

4. **Preview Data**:
   - Power BI จะแสดง Preview ข้อมูล
   - ตรวจสอบว่าข้อมูลถูกต้อง (1,000 rows)
   - คลิก **Load** (หรือ **Transform Data** ถ้าต้องการแก้ไข)

---

### การตรวจสอบข้อมูล (Data Verification):

5. **ตรวจสอบ Data Types**:
   - คลิกที่ **Data** view (icon ด้านซ้าย)
   - ตรวจสอบ Data Type ของแต่ละคอลัมน์:
     ```
     OrderID         → Text
     OrderDate       → Date
     CustomerID      → Text
     CustomerName    → Text
     Region          → Text
     ProductID       → Text
     ProductName     → Text
     Category        → Text
     Quantity        → Whole Number
     UnitPrice       → Decimal Number
     TotalPrice      → Decimal Number
     ```

6. **แก้ไข Data Type** (ถ้าผิด):
   - คลิก icon ที่หัวคอลัมน์ → เลือก Data Type ที่ถูกต้อง
   - หรือคลิกขวา → **Change Type**

---

## 📐 ส่วนที่ 2: สร้าง Measures (DAX Formulas)

Measures เป็นการคำนวณที่เราจะใช้ใน Dashboard

### ขั้นตอนสร้าง Measures:

1. **คลิกที่ Table** "sales_data" ใน **Fields pane** (ด้านขวา)
2. **Home** → **New Measure**
3. พิมพ์สูตร DAX ตามด้านล่าง

---

### Measure 1: Total Sales

```dax
Total Sales = SUM(sales_data[TotalPrice])
```

**กด Enter** → Measure จะปรากฏใน Fields pane

---

### Measure 2: Total Orders

```dax
Total Orders = COUNTROWS(sales_data)
```

---

### Measure 3: Average Sale per Order

```dax
Avg Sale per Order = DIVIDE([Total Sales], [Total Orders], 0)
```

**หมายเหตุ**: `DIVIDE` จะป้องกัน Error หารด้วย 0

---

### Measure 4: Total Quantity (เพิ่มเติม)

```dax
Total Quantity = SUM(sales_data[Quantity])
```

---

### ตรวจสอบ Measures:

- ทุก Measure จะแสดงใน **Fields pane** พร้อม icon 🧮
- สามารถลาก Measure มาใช้ใน Visual ได้

---

## 🎨 ส่วนที่ 3: สร้าง Dashboard Visuals

### การจัดวาง Canvas:

1. คลิกที่ **Report view** (icon ด้านซ้าย)
2. จัดพื้นที่ให้เหมาะสม:
   ```
   ┌─────────────────────────────────────┐
   │  KPI 1   │   KPI 2   │   KPI 3      │ ← บนสุด
   ├──────────┴───────────┴────────────-─┤
   │         Line Chart (กว้าง)           │ ← กลาง-ซ้าย
   ├─────────────────────┬───────────────┤
   │     Bar Chart       │   Pie Chart   │ ← กลาง
   ├─────────────────────┴───────────────┤
   │         Table (Top 10 Products)     │ ← ล่าง
   └─────────────────────────────────────┘
   ```

---

### Visual 1: KPI Card - Total Sales

1. **Visualizations pane** → คลิก **Card** visual
2. ลาก Measure **Total Sales** ไปที่ **Fields**
3. **ปรับแต่ง**:
   - คลิกที่ Card → **Format visual** (paint roller icon)
   - **Callout value** → เลือก Font size: **36**, Bold
   - **Category label** → เปิดใช้งาน → พิมพ์: "💰 Total Sales"
   - **Effects** → **Background**: สีฟ้าอ่อน (#E3F2FD)
4. **ปรับขนาด**: ลากมุมให้เหมาะสม

---

### Visual 2: KPI Card - Total Orders

1. เพิ่ม **Card** visual ใหม่
2. ลาก **Total Orders** ไปที่ Fields
3. **ปรับแต่ง**:
   - Category label: "📦 Total Orders"
   - Background: สีเขียวอ่อน (#E8F5E9)
   - Font size: 36

---

### Visual 3: KPI Card - Avg Sale per Order

1. เพิ่ม **Card** visual ใหม่
2. ลาก **Avg Sale per Order** ไปที่ Fields
3. **ปรับแต่ง**:
   - Category label: "📊 Avg Sale per Order"
   - Background: สีส้มอ่อน (#FFF3E0)
   - Font size: 36

---

### Visual 4: Line Chart - แนวโน้มยอดขายรายเดือน

1. **Visualizations** → คลิก **Line chart**

2. **ลาก Fields**:
   ```
   X-axis: OrderDate (แบบ Month/Year hierarchy)
   Y-axis: Total Sales
   ```

3. **ปรับ Date Hierarchy**:
   - คลิกลูกศรที่ OrderDate ใน X-axis
   - เลือก **Month** (ไม่เอา Day, Quarter)

4. **ปรับแต่ง**:
   - **Title**: "📈 Monthly Sales Trend"
   - **Data labels**: เปิดใช้งาน (เพื่อแสดงตัวเลขบนกราฟ)
   - **X-axis**: Format เป็น "MMM YYYY" (เช่น Nov 2024)
   - **Y-axis**: แสดง Grid lines
   - **Line color**: เลือกสีน้ำเงิน (#1976D2)

5. **เพิ่ม Tooltip**:
   - ลาก **Total Orders** เข้าไปใน **Tooltips**
   - เมื่อ Hover จะแสดงทั้งยอดขายและจำนวนออเดอร์

---

### Visual 5: Bar Chart - Top 5 Regions

1. **Visualizations** → คลิก **Clustered bar chart**

2. **ลาก Fields**:
   ```
   Y-axis: Region
   X-axis: Total Sales
   ```

3. **กรองเฉพาะ Top 5**:
   - คลิกที่ Visual → **Filters pane** (ด้านขวา)
   - **Filters on this visual** → Region
   - **Filter type**: Top N
   - **Show items**: Top 5
   - **By value**: Total Sales
   - คลิก **Apply filter**

4. **เรียงลำดับ**:
   - คลิก **More options** (...) บน Visual
   - **Sort by** → Total Sales
   - **Sort descending**

5. **ปรับแต่ง**:
   - **Title**: "🌍 Top 5 Regions by Sales"
   - **Data labels**: เปิดใช้งาน
   - **Bar color**: Gradient (เขียว → เหลือง)

---

### Visual 6: Pie Chart - สัดส่วนยอดขายตาม Category

1. **Visualizations** → คลิก **Pie chart**

2. **ลาก Fields**:
   ```
   Legend: Category
   Values: Total Sales
   ```

3. **ปรับแต่ง**:
   - **Title**: "📦 Sales by Category"
   - **Legend**: แสดงด้านขวา
   - **Data labels**: แสดง % และชื่อ Category
   - **Slice colors**: ปรับสีแต่ละหมวดหมู่:
     ```
     Electronics → สีน้ำเงิน (#2196F3)
     Clothing    → สีชมพู (#E91E63)
     Home Goods  → สีเขียว (#4CAF50)
     Books       → สีส้ม (#FF9800)
     ```

4. **เพิ่ม Detail Tooltips**:
   - ลาก **Total Orders** เข้า Tooltips
   - ลาก **Total Quantity** เข้า Tooltips

---

### Visual 7: Table - Top 10 สินค้าขายดี

1. **Visualizations** → คลิก **Table**

2. **ลาก Fields**:
   ```
   Columns:
   - ProductName
   - Category
   - Total Sales
   - Total Quantity
   ```

3. **กรองเฉพาะ Top 10**:
   - **Filters on this visual** → ProductName
   - **Filter type**: Top N
   - **Show items**: Top 10
   - **By value**: Total Sales
   - คลิก **Apply filter**

4. **เรียงลำดับ**:
   - คลิกที่หัวคอลัมน์ **Total Sales**
   - เรียงจากมากไปน้อย

5. **ปรับแต่ง**:
   - **Title**: "🏆 Top 10 Best-Selling Products"
   - **Text size**: 11pt
   - **Conditional formatting** (Column: Total Sales):
     - คลิกขวาที่ Total Sales → **Conditional formatting** → **Background color**
     - **Format style**: Gradient
     - **Min**: สีขาว, **Max**: สีเขียวเข้ม
   - **Grid**: แสดง Vertical grid lines

---

### Visual 8: Slicers (Filters)

#### Slicer 1: Region Filter

1. **Visualizations** → คลิก **Slicer**
2. ลาก **Region** เข้า Field
3. **ปรับแต่ง**:
   - **Slicer settings** → **Style**: Dropdown
   - **Title**: "🌍 Filter by Region"
   - **Position**: มุมบนซ้าย

#### Slicer 2: Category Filter

1. เพิ่ม **Slicer** ใหม่
2. ลาก **Category** เข้า Field
3. **ปรับแต่ง**:
   - **Style**: List (แบบ Checkbox)
   - **Title**: "📦 Filter by Category"
   - **Position**: ใต้ Region Slicer

#### Slicer 3: Date Range

1. เพิ่ม **Slicer** ใหม่
2. ลาก **OrderDate** เข้า Field
3. **ปรับแต่ง**:
   - **Slicer settings** → **Style**: Between
   - **Title**: "📅 Date Range"
   - **Position**: มุมบนขวา

---

## 🎨 ส่วนที่ 4: ปรับแต่ง Dashboard

### 1. จัดหน้า Dashboard

1. **View** Tab → **Page view** → **Fit to page**
2. ปรับขนาดและตำแหน่ง Visuals ให้สมดุล
3. **Align visuals**:
   - เลือก Visuals หลายตัว (Ctrl + Click)
   - **Format** → **Align** → เลือก Top, Bottom, Left, Right

### 2. เพิ่ม Dashboard Title

1. **Insert** Tab → **Text box**
2. พิมพ์: **"🛒 E-commerce Sales Analysis Dashboard"**
3. **Format**:
   - Font: Segoe UI, Size: 28, Bold
   - Color: #1976D2 (น้ำเงิน)
   - Alignment: Center
4. วางไว้บนสุดของหน้า

### 3. เพิ่ม Background

1. **Visualizations** → **Format page**
2. **Canvas background**:
   - Color: #F5F5F5 (เทาอ่อน)
   - Transparency: 0%

### 4. เพิ่ม Logo/Image (Optional)

1. **Insert** → **Image**
2. เลือกรูปโลโก้ (เช่น โลโก้มหาวิทยาลัย)
3. วางไว้มุมขวาบน

---

## 🚀 ส่วนที่ 5: Publish Dashboard

### ขั้นที่ 1: บันทึกไฟล์

1. **File** → **Save**
2. ตั้งชื่อ: `E-commerce_Sales_Dashboard.pbix`
3. บันทึกไว้ใน `c:\Project_Data\`

---

### ขั้นที่ 2: Publish to Power BI Service

1. **Home** Tab → คลิก **Publish**

2. **Sign in**:
   - ใส่ข้อมูล Microsoft Account
   - คลิก **Sign in**

3. **Select destination**:
   - เลือก **My workspace** (หรือ Workspace ที่ต้องการ)
   - คลิก **Select**

4. **รอ Upload**:
   - ระบบจะ Upload ไฟล์ไปยัง Cloud
   - เมื่อเสร็จจะแสดง **Success!**
   - คลิก **Open '[ชื่อไฟล์].pbix' in Power BI**

---

### ขั้นที่ 3: สร้าง Public Embed Link

1. **เปิด Power BI Service** ([https://app.powerbi.com/](https://app.powerbi.com/))

2. ไปที่ **My workspace** → หา Report ที่ Publish มา

3. **คลิกที่ Report** → จะเปิดหน้า Dashboard

4. **File** → **Embed report** → **Publish to web (public)**

5. **Create embed code**:
   - อ่านคำเตือน (ข้อมูลจะเป็น Public)
   - คลิก **Create embed code**
   - รอสักครู่

6. **Copy Embed Code**:
   - จะได้ 2 ลิงก์:
     - **Link to share**: ใช้แชร์โดยตรง (เช่น https://app.powerbi.com/view?r=xxx)
     - **HTML iframe code**: ใช้ Embed ใน Website
   - **Copy ทั้ง 2 ลิงก์** เก็บไว้

7. **บันทึกลิงก์**:
   - เปิด Notepad
   - วางลิงก์ทั้ง 2
   - บันทึกเป็น `power_bi_links.txt` ใน `c:\Project_Data\`

---

### ตัวอย่างลิงก์:

#### Link to share (สำหรับแชร์):
```
https://app.powerbi.com/view?r=IwAyMDI0MTEwMzE2MDAwMA==
```

#### HTML Embed Code (สำหรับใส่ใน Web App):
```html
<iframe 
  title="E-commerce Sales Dashboard" 
  width="1140" 
  height="541.25" 
  src="https://app.powerbi.com/view?r=IwAyMDI0MTEwMzE2MDAwMA==" 
  frameborder="0" 
  allowFullScreen="true">
</iframe>
```

---

## 🔧 ส่วนที่ 6: ทดสอบ Dashboard

### การทดสอบ:

1. **เปิดลิงก์ในเบราว์เซอร์** (Link to share)
2. **ทดสอบ Interactivity**:
   - ✅ คลิกที่ Bar Chart → Visual อื่นๆ ควร Filter ตามข้อมูลที่เลือก
   - ✅ ใช้ Slicer เปลี่ยน Region → ทุก Visual ควรอัพเดท
   - ✅ เลือก Date Range → ข้อมูลควรกรองตามช่วงเวลา
3. **ทดสอบ Responsiveness**:
   - เปิดใน Desktop, Tablet, Mobile
   - ตรวจสอบว่าแสดงผลได้ดี

---

## 📊 ส่วนที่ 7: Dashboard Best Practices

### 1. การออกแบบ:
- ✅ ใช้สีสันที่สอดคล้องกัน (Color scheme)
- ✅ จัดวาง Visual ให้มีลำดับความสำคัญ (Visual hierarchy)
- ✅ เว้นระยะห่างระหว่าง Visual ให้เหมาะสม (White space)

### 2. ประสิทธิภาพ:
- ✅ ไม่ใส่ Visual มากเกินไป (ควรไม่เกิน 10-12 visuals ต่อหน้า)
- ✅ ใช้ Aggregation แทนการแสดงข้อมูลทุก Row
- ✅ กรองข้อมูลที่ไม่จำเป็นออก (เช่น Top 10 แทนทั้งหมด)

### 3. User Experience:
- ✅ ให้ Tooltip ที่มีข้อมูลครบถ้วน
- ✅ ใส่ Title ที่อธิบายได้ชัดเจน
- ✅ เปิดใช้ Cross-filtering (คลิก Visual หนึ่งแล้วอีก Visual อัพเดทตาม)

---

## 🎯 ตัวอย่าง Insights จาก Dashboard

หลังจากสร้าง Dashboard เสร็จ คุณควรสามารถตอบคำถามเหล่านี้ได้:

### 📈 Business Insights:

1. **ยอดขายรวมทั้งหมดเป็นเท่าไร?**
   - ดูจาก KPI Card: Total Sales

2. **ภูมิภาคไหนมียอดขายสูงสุด?**
   - ดูจาก Bar Chart: Top 5 Regions
   - **Insight**: Central มักมียอดสูงสุด (40% ของตลาด)

3. **หมวดหมู่ไหนขายดีที่สุด?**
   - ดูจาก Pie Chart: Sales by Category
   - **Insight**: Electronics มักมียอดสูงสุดเพราะราคาสูง

4. **สินค้าไหนขายดีที่สุด?**
   - ดูจาก Table: Top 10 Products
   - **Insight**: Smartphone, Laptop มักอยู่ในอันดับต้นๆ

5. **ยอดขายมีแนวโน้มเป็นอย่างไร?**
   - ดูจาก Line Chart: Monthly Trend
   - **Insight**: ยอดขายเติบโตขึ้นเรื่อยๆ (ตาม Beta distribution ที่เราออกแบบ)

6. **ช่วงไหนเป็น High Season?**
   - ดูจาก Line Chart: Peak ตรงเดือนไหน
   - **Insight**: ช่วงท้ายปี (Nov-Dec) มักมียอดสูง

---

## 📋 Checklist ก่อน Submit

- [ ] Dashboard มี Visuals ครบทั้ง 7 ประเภท (KPI Cards, Line, Bar, Pie, Table, Slicers)
- [ ] ทุก Visual มี Title ที่ชัดเจน
- [ ] Data labels แสดงอย่างเหมาะสม
- [ ] สี Font และ Background สวยงาม สอดคล้องกัน
- [ ] Interactivity ทำงานได้ถูกต้อง (Cross-filtering)
- [ ] Publish to Power BI Service สำเร็จ
- [ ] สร้าง Public Embed Link ได้แล้ว
- [ ] บันทึกลิงก์ไว้ใน power_bi_links.txt
- [ ] ทดสอบลิงก์เปิดได้ในเบราว์เซอร์
- [ ] Capture Screenshot ของ Dashboard เก็บไว้ในรายงาน

---

## 📝 เอกสารเพิ่มเติม

### ไฟล์ที่ควรมีหลังจากเสร็จ:

1. `E-commerce_Sales_Dashboard.pbix` - ไฟล์ Power BI Desktop
2. `power_bi_links.txt` - ลิงก์สำหรับแชร์และ Embed
3. `dashboard_screenshot.png` - ภาพหน้าจอ Dashboard
4. เอกสารอธิบายผล Insights (สำหรับรายงาน)

---

## ➡️ ขั้นตอนถัดไป

หลังจากสร้าง Dashboard เสร็จแล้ว:

1. ✅ Capture Screenshot ของ Dashboard
2. ✅ Copy Embed Code ไว้
3. 🌐 นำ Embed Code ไปใส่ใน **Web Application** - ดูโฟลเดอร์ `web-app/`
4. 📝 เขียนสรุป Insights ในรายงาน

---

## 🎓 Tips

✅ **อธิบาย Business Value**: ไม่ใช่แค่สวย แต่ต้องใช้งานได้จริง

✅ **ทำ Interactive**: ให้ผู้ใช้สามารถกรองและสำรวจข้อมูลเองได้

✅ **Design คือกุญแจ**: Dashboard ที่ดีต้องดูง่าย เข้าใจง่าย ไม่ยุ่งเหยิง

✅ **เล่าเรื่อง**: ใช้ Dashboard เล่าเรื่องราวของข้อมูล (Data Storytelling)

---

**Good luck creating your dashboard! 📊✨**
