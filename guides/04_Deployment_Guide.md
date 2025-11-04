# คู่มือการ Deploy Web Application

## 📋 ภาพรวม

เอกสารนี้แนะนำขั้นตอนการ Deploy **E-commerce Sales Analysis Dashboard** ขึ้น Hosting บนอินเทอร์เน็ตเพื่อให้เข้าถึงได้จากทุกที่

---

## 🎯 Platform ที่แนะนำ

เราจะใช้ **Netlify** เพราะ:
- ✅ **ฟรี** สำหรับ Personal Projects
- ✅ **ใช้งานง่าย** - Deploy ได้ใน 5 นาที
- ✅ **Continuous Deployment** - Auto update เมื่อ push code
- ✅ **Custom Domain** - ใช้ชื่อโดเมนของตัวเอง (Optional)
- ✅ **HTTPS** - รองรับ Secure connection โดยอัตโนมัติ

**ทางเลือกอื่น**: Vercel, GitHub Pages, Render

---

## 🚀 วิธีที่ 1: Deploy ด้วย Netlify (แนะนำ)

### ขั้นเตรียมการ:

#### 1. สมัครบัญชี Netlify

1. ไปที่ [https://www.netlify.com/](https://www.netlify.com/)
2. คลิก **Sign up** 
3. เลือก **Sign up with GitHub** (หรือ Email)
4. ยืนยันอีเมล
5. เข้าสู่ระบบ Netlify Dashboard

---

#### 2. เตรียม Project ให้พร้อม Deploy

เปิด Terminal (PowerShell) ใน `c:\Project_Data\web-app`:

```powershell
# ติดตั้ง Dependencies
npm install

# ทดสอบ Build
npm run build
```

หลังจากรัน `npm run build` จะได้โฟลเดอร์ `build/` ที่มีไฟล์ HTML, CSS, JS สำหรับ Deploy

---

### วิธีที่ 1.1: Deploy ด้วย Drag & Drop (ง่ายที่สุด)

1. **Build Project**:
   ```powershell
   cd c:\Project_Data\web-app
   npm run build
   ```

2. **เปิด Netlify Dashboard**: [https://app.netlify.com/](https://app.netlify.com/)

3. **Drag & Drop**:
   - ลากโฟลเดอร์ `build/` วางลงในกล่อง **"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"**
   - Netlify จะเริ่ม Upload และ Deploy

4. **รอการ Deploy**:
   - สถานะจะแสดง **"Site deploy in progress"**
   - รอประมาณ 1-2 นาที

5. **เปิด Website**:
   - หลัง Deploy สำเร็จ จะได้ URL เช่น: `https://random-name-12345.netlify.app`
   - คลิกลิงก์เพื่อเปิดเว็บไซต์

---

### วิธีที่ 1.2: Deploy ด้วย Git (Auto Deploy)

#### ขั้นตอน:

##### 1. สร้าง Git Repository

```powershell
# เข้าไปในโฟลเดอร์ web-app
cd c:\Project_Data\web-app

# สร้าง Git Repository
git init

# Add ไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit: E-commerce Sales Dashboard"
```

##### 2. Push ขึ้น GitHub

1. **สร้าง Repository บน GitHub**:
   - ไปที่ [https://github.com/new](https://github.com/new)
   - ตั้งชื่อ: `ecommerce-sales-dashboard`
   - เลือก **Public** หรือ **Private**
   - **ไม่ต้อง** เลือก "Initialize with README"
   - คลิก **Create repository**

2. **Push Code**:
   ```powershell
   # เพิ่ม Remote (แทนที่ YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-sales-dashboard.git
   
   # Push
   git branch -M main
   git push -u origin main
   ```

##### 3. เชื่อม Netlify กับ GitHub

1. **Netlify Dashboard** → คลิก **Add new site** → **Import an existing project**

2. **เลือก Git Provider**:
   - คลิก **GitHub**
   - อนุญาตให้ Netlify เข้าถึง GitHub

3. **เลือก Repository**:
   - เลือก Repository `ecommerce-sales-dashboard`

4. **ตั้งค่า Build**:
   ```
   Branch to deploy: main
   Build command: npm run build
   Publish directory: build
   ```

5. **คลิก Deploy site**

6. **รอการ Deploy**:
   - Netlify จะ Build และ Deploy อัตโนมัติ
   - ตรวจสอบ Logs ว่า Deploy สำเร็จ

7. **เปิด Website**:
   - ได้ URL เช่น: `https://your-site-name.netlify.app`

---

### ขั้นตอนหลัง Deploy:

#### 1. เปลี่ยนชื่อ Site (Optional)

1. **Site settings** → **Site details**
2. คลิก **Change site name**
3. ตั้งชื่อใหม่ เช่น: `sales-dashboard-project`
4. URL จะเป็น: `https://sales-dashboard-project.netlify.app`

#### 2. เพิ่ม Power BI Embed URL

1. **เปิดไฟล์** `src/pages/DashboardPage.js`
2. **แก้ไขบรรทัด 14**:
   ```javascript
   const powerBIEmbedUrl = "YOUR_ACTUAL_POWER_BI_URL";
   ```
3. **Commit และ Push**:
   ```powershell
   git add .
   git commit -m "Add Power BI Embed URL"
   git push
   ```
4. **Netlify จะ Auto Deploy** ใหม่ภายใน 1-2 นาที

#### 3. ทดสอบ Website

เปิดเบราว์เซอร์ทดสอบ:
- ✅ หน้า Login: ใส่ Username/Password ได้
- ✅ หน้า Dashboard: แสดง Power BI Dashboard (ถ้าใส่ URL แล้ว)
- ✅ หน้า Data Management: เพิ่ม/แก้ไข/ลบข้อมูลได้
- ✅ หน้า Analysis Summary: แสดงผลสรุปการวิเคราะห์

---

## 🚀 วิธีที่ 2: Deploy ด้วย Vercel (ทางเลือก)

### ขั้นตอน:

1. **สมัคร Vercel**: [https://vercel.com/signup](https://vercel.com/signup)

2. **ติดตั้ง Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

3. **Login**:
   ```powershell
   vercel login
   ```

4. **Deploy**:
   ```powershell
   cd c:\Project_Data\web-app
   vercel
   ```

5. **ตอบคำถาม**:
   ```
   ? Set up and deploy? Y
   ? Which scope? (เลือกบัญชีของคุณ)
   ? Link to existing project? N
   ? What's your project's name? ecommerce-sales-dashboard
   ? In which directory is your code located? ./
   ? Want to override the settings? N
   ```

6. **รอการ Deploy** → จะได้ URL เช่น: `https://ecommerce-sales-dashboard.vercel.app`

7. **Deploy Production**:
   ```powershell
   vercel --prod
   ```

---

## 🌐 วิธีที่ 3: Deploy ด้วย GitHub Pages (ฟรี 100%)

### ขั้นตอน:

1. **ติดตั้ง gh-pages**:
   ```powershell
   npm install --save-dev gh-pages
   ```

2. **แก้ไข package.json**:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/ecommerce-sales-dashboard",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```powershell
   npm run deploy
   ```

4. **เปิดใช้งาน GitHub Pages**:
   - ไปที่ Repository Settings → Pages
   - **Source**: gh-pages branch
   - **Save**

5. **เปิด Website**:
   - URL: `https://YOUR_USERNAME.github.io/ecommerce-sales-dashboard`

---

## 🔧 การแก้ปัญหา (Troubleshooting)

### 1. Build ไม่สำเร็จ

**อาการ**: `npm run build` แสดง Error

**วิธีแก้**:
```powershell
# ลบ node_modules
Remove-Item -Recurse -Force node_modules

# ลบ package-lock.json
Remove-Item package-lock.json

# ติดตั้งใหม่
npm install

# ลอง Build อีกครั้ง
npm run build
```

### 2. Page ไม่แสดงหลังจาก Refresh

**อาการ**: Refresh หน้าเว็บแล้วเจอ 404 Error

**วิธีแก้ (Netlify)**:
1. สร้างไฟล์ `public/_redirects`:
   ```
   /*    /index.html   200
   ```
2. Deploy ใหม่

### 3. Power BI Dashboard ไม่แสดง

**อาการ**: แสดง Placeholder แทน Dashboard

**วิธีแก้**:
1. ตรวจสอบว่าใส่ **Embed URL** ใน `DashboardPage.js` แล้ว
2. ตรวจสอบว่า URL ถูกต้อง (เริ่มด้วย `https://app.powerbi.com/view?r=`)
3. ตรวจสอบว่า Dashboard เป็น **Public** (Publish to web)

### 4. Routing ไม่ทำงานใน Production

**อาการ**: คลิกเมนูแล้วเจอ 404

**วิธีแก้**:
- ตรวจสอบว่าใช้ `BrowserRouter` จาก `react-router-dom`
- เพิ่มไฟล์ `_redirects` (Netlify) หรือ `vercel.json` (Vercel)

---

## 📊 Checklist ก่อน Submit โปรเจกต์

- [ ] ✅ Web App รันได้บน Localhost (`npm start`)
- [ ] ✅ Build สำเร็จ (`npm run build`)
- [ ] ✅ Deploy ขึ้น Hosting สำเร็จ (Netlify/Vercel)
- [ ] ✅ เปิด Public URL ได้จากเบราว์เซอร์
- [ ] ✅ ทดสอบฟังก์ชันทั้ง 11 ฟังก์ชัน ทำงานได้ถูกต้อง
- [ ] ✅ Power BI Dashboard แสดงผลได้ (ถ้าใส่ URL แล้ว)
- [ ] ✅ Responsive - เปิดได้ทั้ง Desktop และ Mobile
- [ ] ✅ บันทึก URL ไว้ในรายงาน
- [ ] ✅ Capture Screenshot หน้าจอทุกหน้า
- [ ] ✅ เขียนคู่มือการใช้งานในรายงาน

---

## 📝 ตัวอย่าง URL ที่ได้

### Netlify:
```
https://sales-dashboard-project.netlify.app
```

### Vercel:
```
https://ecommerce-sales-dashboard.vercel.app
```

### GitHub Pages:
```
https://username.github.io/ecommerce-sales-dashboard
```

---

## 🎓 Tips

1. **บันทึก URL** ไว้ให้ดี - จะต้องใส่ในรายงาน
2. **Capture Screenshot** ทุกหน้าเก็บไว้
3. **ทดสอบใน Incognito Mode** เพื่อให้แน่ใจว่าใครก็เปิดได้
4. **เตรียม Demo** - ฝึกพูดอธิบายฟีเจอร์ต่างๆ
5. **เก็บ Source Code** - สำรองไว้หลายที่ (GitHub + Local)

---

## 🔗 ลิงก์ที่เป็นประโยชน์

- **Netlify Docs**: [https://docs.netlify.com/](https://docs.netlify.com/)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **React Deployment**: [https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/)
- **Power BI Embed**: [https://powerbi.microsoft.com/en-us/documentation/](https://powerbi.microsoft.com/en-us/documentation/)

---

## ✨ สรุป

ขั้นตอนการ Deploy:
1. ✅ Build Project (`npm run build`)
2. ✅ สมัครบัญชี Netlify/Vercel
3. ✅ Deploy ด้วย Drag & Drop หรือ Git
4. ✅ ทดสอบ Website
5. ✅ บันทึก URL และ Screenshot


---

**Good luck with your project! 🚀✨**
