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
fake = Faker('th_TH')  # ใช้ข้อมูลภาษาไทย
Faker.seed(42)

# ========================================
# ส่วนที่ 1: กำหนดข้อมูลหลัก (Master Data)
# ========================================

# กำหนดภูมิภาค (Regions)
REGIONS = ['North', 'South', 'East', 'West', 'Central']

# กำหนดหมวดหมู่สินค้าและสินค้า (Categories & Products)
CATEGORIES = {
    'Electronics': [
        'Smartphone Pro Max', 'Laptop Gaming Ultra', 'Wireless Earbuds Premium',
        'Smart Watch Series 5', '4K Smart TV 55"', 'Tablet Air 10"',
        'Bluetooth Speaker', 'Gaming Mouse RGB', 'Mechanical Keyboard',
        'External SSD 1TB'
    ],
    'Clothing': [
        'Cotton T-Shirt', 'Denim Jeans', 'Running Shoes',
        'Winter Jacket', 'Sports Leggings', 'Polo Shirt',
        'Casual Sneakers', 'Hoodie Premium', 'Dress Shirt',
        'Summer Dress'
    ],
    'Home Goods': [
        'Coffee Maker Deluxe', 'Vacuum Cleaner Robot', 'Air Purifier HEPA',
        'Blender Pro 1200W', 'Electric Kettle', 'Rice Cooker Smart',
        'Non-Stick Pan Set', 'LED Desk Lamp', 'Storage Box Set',
        'Memory Foam Pillow'
    ],
    'Books': [
        'Python Programming Guide', 'Data Science Handbook', 'Business Strategy 101',
        'Digital Marketing Essentials', 'Financial Management', 'Entrepreneurship',
        'Machine Learning Basics', 'Web Development Pro', 'Leadership Skills',
        'Personal Finance'
    ]
}

# กำหนดช่วงราคาต่อหน่วยตามหมวดหมู่ (Price Ranges by Category)
PRICE_RANGES = {
    'Electronics': (500, 35000),
    'Clothing': (200, 3500),
    'Home Goods': (150, 8000),
    'Books': (150, 1200)
}

# ========================================
# ส่วนที่ 2: สร้างข้อมูลจำลอง
# ========================================

def generate_sales_data(num_records=1000):
    """
    สร้างข้อมูลการขายจำลอง
    
    Parameters:
    -----------
    num_records : int
        จำนวน records ที่ต้องการสร้าง (default: 1000)
    
    Returns:
    --------
    pandas.DataFrame
        DataFrame ที่มีข้อมูลการขาย
    """
    
    print(f"🔄 กำลังสร้างข้อมูล {num_records} records...")
    
    # สร้าง list เก็บข้อมูล
    data = []
    
    # กำหนดวันที่เริ่มต้นและสิ้นสุด (ย้อนหลัง 1 ปี)
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    
    # สร้างข้อมูลแต่ละ record
    for i in range(1, num_records + 1):
        # สร้าง OrderID
        order_id = f"ORD{i:05d}"
        
        # สร้างวันที่สุ่ม (OrderDate)
        # ให้น้ำหนักมากขึ้นกับวันที่ใกล้ปัจจุบัน (เพื่อจำลองการเติบโตของธุรกิจ)
        days_diff = (end_date - start_date).days
        random_days = int(np.random.beta(2, 5) * days_diff)  # Beta distribution
        order_date = start_date + timedelta(days=random_days)
        
        # สร้าง Customer ID และ Name
        customer_id = f"CUST{random.randint(1, 300):04d}"  # มีลูกค้า 300 คนที่ซื้อซ้ำได้
        customer_name = fake.name()
        
        # สุ่ม Region
        # ให้ Central มีโอกาสสูงกว่า (เพื่อจำลองตลาดหลัก)
        region_weights = [0.15, 0.15, 0.15, 0.15, 0.40]
        region = random.choices(REGIONS, weights=region_weights)[0]
        
        # สุ่ม Category และ Product
        category = random.choice(list(CATEGORIES.keys()))
        product_name = random.choice(CATEGORIES[category])
        
        # สร้าง Product ID (unique สำหรับแต่ละสินค้า)
        product_list = [p for products in CATEGORIES.values() for p in products]
        product_id = f"PROD{product_list.index(product_name) + 1:03d}"
        
        # สุ่ม Quantity (1-10 ชิ้น, โดยส่วนใหญ่จะเป็น 1-3 ชิ้น)
        quantity = int(np.random.gamma(2, 1)) + 1
        quantity = min(quantity, 10)  # จำกัดไม่เกิน 10
        
        # สุ่ม Unit Price ตามช่วงราคาของหมวดหมู่
        min_price, max_price = PRICE_RANGES[category]
        unit_price = round(random.uniform(min_price, max_price), 2)
        
        # คำนวณ Total Price
        total_price = round(quantity * unit_price, 2)
        
        # เพิ่มข้อมูลลงใน list
        data.append({
            'OrderID': order_id,
            'OrderDate': order_date.strftime('%Y-%m-%d'),
            'CustomerID': customer_id,
            'CustomerName': customer_name,
            'Region': region,
            'ProductID': product_id,
            'ProductName': product_name,
            'Category': category,
            'Quantity': quantity,
            'UnitPrice': unit_price,
            'TotalPrice': total_price
        })
        
        # แสดงความคืบหน้า
        if i % 100 == 0:
            print(f"✓ สร้างข้อมูลแล้ว {i}/{num_records} records")
    
    # แปลงเป็น DataFrame
    df = pd.DataFrame(data)
    
    # เรียงลำดับตาม OrderDate
    df = df.sort_values('OrderDate').reset_index(drop=True)
    
    return df


def print_data_summary(df):
    """
    แสดงสรุปข้อมูลที่สร้างขึ้น
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame ที่ต้องการแสดงสรุป
    """
    print("\n" + "="*70)
    print("📊 สรุปข้อมูลที่สร้าง")
    print("="*70)
    
    print(f"\n📈 จำนวนข้อมูลทั้งหมด: {len(df):,} records")
    
    print(f"\n📅 ช่วงเวลา:")
    print(f"   - วันที่เริ่มต้น: {df['OrderDate'].min()}")
    print(f"   - วันที่สิ้นสุด: {df['OrderDate'].max()}")
    
    print(f"\n💰 ยอดขายรวม: ฿{df['TotalPrice'].sum():,.2f}")
    print(f"   - ยอดขายเฉลี่ยต่อออเดอร์: ฿{df['TotalPrice'].mean():,.2f}")
    print(f"   - ยอดขายสูงสุด: ฿{df['TotalPrice'].max():,.2f}")
    print(f"   - ยอดขายต่ำสุด: ฿{df['TotalPrice'].min():,.2f}")
    
    print(f"\n🌍 จำนวนออเดอร์ตามภูมิภาค:")
    for region, count in df['Region'].value_counts().items():
        percentage = (count / len(df)) * 100
        print(f"   - {region}: {count} orders ({percentage:.1f}%)")
    
    print(f"\n📦 จำนวนออเดอร์ตามหมวดหมู่:")
    for category, count in df['Category'].value_counts().items():
        percentage = (count / len(df)) * 100
        sales = df[df['Category'] == category]['TotalPrice'].sum()
        print(f"   - {category}: {count} orders ({percentage:.1f}%) | ยอดขาย: ฿{sales:,.2f}")
    
    print(f"\n👥 จำนวนลูกค้า (Unique): {df['CustomerID'].nunique()}")
    print(f"📦 จำนวนสินค้า (Unique): {df['ProductID'].nunique()}")
    
    print("\n" + "="*70)


def save_to_csv(df, filename='sales_data.csv'):
    """
    บันทึกข้อมูลเป็นไฟล์ CSV
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame ที่ต้องการบันทึก
    filename : str
        ชื่อไฟล์ที่ต้องการบันทึก
    """
    df.to_csv(filename, index=False, encoding='utf-8-sig')  # utf-8-sig สำหรับ Excel
    print(f"\n✅ บันทึกข้อมูลเรียบร้อยแล้ว: {filename}")
    print(f"📁 ขนาดไฟล์: {len(df)} rows × {len(df.columns)} columns")


# ========================================
# ส่วนที่ 3: Main Program
# ========================================

if __name__ == "__main__":
    print("\n" + "="*70)
    print("🚀 เริ่มสร้างข้อมูลการขาย E-commerce")
    print("="*70)
    
    # สร้างข้อมูล 1,000 records
    df = generate_sales_data(num_records=1000)
    
    # แสดงตัวอย่างข้อมูล 5 แถวแรก
    print("\n📋 ตัวอย่างข้อมูล (5 แถวแรก):")
    print(df.head().to_string(index=False))
    
    # แสดงสรุปข้อมูล
    print_data_summary(df)
    
    # บันทึกเป็นไฟล์ CSV
    save_to_csv(df, 'sales_data.csv')
    
    print("\n" + "="*70)
    print("✨ เสร็จสิ้นการสร้างข้อมูล!")
    print("="*70)
    print("\n📝 ขั้นตอนถัดไป:")
    print("   1. นำไฟล์ sales_data.csv ไปวิเคราะห์ใน Excel (ดูคู่มือใน guides/)")
    print("   2. สร้าง Dashboard ใน Power BI Desktop")
    print("   3. รัน Web Application เพื่อแสดงผลข้อมูล\n")
