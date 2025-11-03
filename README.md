# ระบบวิเคราะห์ข้อมูลการขาย E-commerce (E-commerce Sales Analysis Dashboard)

## 📊 ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็นระบบวิเคราะห์ข้อมูลการขายแบบ Full-stack ที่ครอบคลุมตั้งแต่การสร้างข้อมูล, การวิเคราะห์ด้วย Excel และ Power BI, ไปจนถึงการพัฒนา Web Application ที่มีฟังก์ชันครบถ้วน

## 🎯 วัตถุประสงค์

- พัฒนาทักษะการวิเคราะห์ข้อมูลด้วยเครื่องมือมาตรฐานอุตสาหกรรม
- สร้าง Dashboard แบบ Interactive สำหรับติดตามยอดขาย
- พัฒนา Web Application ที่มีระบบจัดการข้อมูลแบบครบวงจร

## 📁 โครงสร้างโปรเจกต์

```
Project_Data/
├── data/                      # ข้อมูลและสคริปต์สร้างข้อมูล
│   ├── generate_data.py       # สคริปต์สร้างข้อมูลจำลอง
│   ├── sales_data.csv         # ข้อมูลการขาย 1,000 records
│   └── requirements.txt       # Python dependencies
├── guides/                    # คู่มือการใช้งาน
│   ├── 01_Data_Generation_Guide.md
│   ├── 02_Excel_Analysis_Guide.md
│   ├── 03_PowerBI_Dashboard_Guide.md
│   └── 04_Deployment_Guide.md
├── web-app/                   # Web Application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 ขั้นตอนการใช้งาน

### ส่วนที่ 1: สร้างข้อมูล
```bash
cd data
pip install -r requirements.txt
python generate_data.py
```

### ส่วนที่ 2: วิเคราะห์ด้วย Excel
ดูคู่มือใน `guides/02_Excel_Analysis_Guide.md`

### ส่วนที่ 3: สร้าง Dashboard ด้วย Power BI
ดูคู่มือใน `guides/03_PowerBI_Dashboard_Guide.md`

### ส่วนที่ 4: รัน Web Application
```bash
cd web-app
npm install
npm start
```

## 📋 ฟีเจอร์หลัก (12 ฟังก์ชัน)

1. ✅ แสดง Power BI Dashboard แบบ Embedded
2. ✅ ระบบ Login (UI Mockup)
3. ✅ เพิ่มข้อมูลการขายใหม่
4. ✅ แสดงตารางข้อมูลทั้งหมด
5. ✅ ค้นหาข้อมูล (Search)
6. ✅ กรองข้อมูลตาม Region (Filter)
7. ✅ เรียงลำดับข้อมูล (Sort)
8. ✅ แก้ไขข้อมูล (Edit)
9. ✅ ลบข้อมูล (Delete)
10. ✅ แสดงสรุปผลการวิเคราะห์
11. ✅ Export ข้อมูลเป็น CSV
12. ✅ **Import CSV File (NEW!)** - นำเข้าข้อมูลจากไฟล์ภายนอก

## 🛠️ เทคโนโลยีที่ใช้

- **Data Generation**: Python, Pandas, Faker
- **Data Analysis**: Excel Analysis ToolPak
- **Visualization**: Power BI Desktop
- **Frontend**: React.js, Material-UI
- **Deployment**: Netlify / Vercel

## 👨‍💻 ผู้พัฒนา

Nattawut Chaturaponkul (66050146) - วิชา Data Analytics & Visualization

## 📅 วันที่พัฒนา

November 2025
