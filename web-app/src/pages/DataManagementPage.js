/**
 * Data Management Page
 * รวมฟังก์ชัน:
 * 3. Add New Sale Entry
 * 4. Display Sales Table
 * 5. Search Functionality
 * 6. Filter by Region
 * 7. Sort Data
 * 8. Edit Data
 * 9. Delete Data
 * 11. Export to CSV
 * 12. Import CSV File (NEW!)
 */

import React, { useState, useMemo, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as DownloadIcon,
  FileUpload as UploadIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';

// Regions และ Categories สำหรับ Dropdown
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
const CATEGORIES = ['Electronics', 'Clothing', 'Home Goods', 'Books'];

function DataManagementPage({ salesData, onAddSale, onEditSale, onDeleteSale }) {
  // ฟังก์ชันที่ 5: Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // ฟังก์ชันที่ 6: Filter State
  const [filterRegion, setFilterRegion] = useState('All');
  
  // Dialog States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // ฟังก์ชันที่ 12: Import CSV State
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState({ open: false, message: '', severity: 'success' });

  // ฟังก์ชันที่ 5: Search - กรองข้อมูลตาม CustomerName หรือ ProductName
  // ฟังก์ชันที่ 6: Filter - กรองข้อมูลตาม Region
  const filteredData = useMemo(() => {
    let data = [...salesData];
    
    // Search Filter
    if (searchQuery) {
      data = data.filter(row =>
        row.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Region Filter
    if (filterRegion !== 'All') {
      data = data.filter(row => row.Region === filterRegion);
    }
    
    return data;
  }, [salesData, searchQuery, filterRegion]);

  // ฟังก์ชันที่ 11: Export to CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sales_data_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    setSuccessMessage('✅ Export CSV สำเร็จ!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // ฟังก์ชันที่ 12: Import CSV File (NEW!)
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ตรวจสอบว่าเป็นไฟล์ CSV หรือไม่
    if (!file.name.endsWith('.csv')) {
      setImportStatus({
        open: true,
        message: '❌ กรุณาเลือกไฟล์ CSV เท่านั้น',
        severity: 'error'
      });
      return;
    }

    // อ่านไฟล์ CSV ด้วย PapaParse
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const importedData = results.data;
          
          // ตรวจสอบว่ามีข้อมูลหรือไม่
          if (!importedData || importedData.length === 0) {
            setImportStatus({
              open: true,
              message: '❌ ไฟล์ CSV ไม่มีข้อมูล',
              severity: 'error'
            });
            return;
          }

          // ตรวจสอบ Required Columns
          const requiredColumns = ['OrderDate', 'CustomerName', 'Region', 'ProductName', 'Category', 'Quantity', 'UnitPrice'];
          const fileColumns = Object.keys(importedData[0]);
          const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));
          
          if (missingColumns.length > 0) {
            setImportStatus({
              open: true,
              message: `❌ ไฟล์ CSV ขาดคอลัมน์: ${missingColumns.join(', ')}`,
              severity: 'error'
            });
            return;
          }

          // แปลงข้อมูลและเพิ่มเข้าระบบ
          let successCount = 0;
          importedData.forEach((row, index) => {
            try {
              const quantity = parseInt(row.Quantity) || 1;
              const unitPrice = parseFloat(row.UnitPrice) || 0;
              
              const newSale = {
                // เพิ่ม id field (สำคัญสำหรับ DataGrid!)
                id: salesData.length + index + 1,
                OrderID: row.OrderID || `ORD${String(salesData.length + index + 1).padStart(5, '0')}`,
                OrderDate: row.OrderDate || new Date().toISOString().split('T')[0],
                CustomerID: row.CustomerID || `C${String(salesData.length + index + 1).padStart(4, '0')}`,
                CustomerName: row.CustomerName || 'Unknown',
                Region: REGIONS.includes(row.Region) ? row.Region : 'Central',
                ProductID: row.ProductID || `P${String(index + 1).padStart(4, '0')}`,
                ProductName: row.ProductName || 'Unknown Product',
                Category: CATEGORIES.includes(row.Category) ? row.Category : 'Electronics',
                Quantity: quantity,
                UnitPrice: unitPrice,
                TotalPrice: quantity * unitPrice,
              };
              
              onAddSale(newSale);
              successCount++;
            } catch (error) {
              console.error(`Error importing row ${index}:`, error);
            }
          });

          setImportStatus({
            open: true,
            message: `✅ Import สำเร็จ ${successCount} records จากทั้งหมด ${importedData.length} records`,
            severity: 'success'
          });
          
        } catch (error) {
          setImportStatus({
            open: true,
            message: `❌ เกิดข้อผิดพลาดในการ Import: ${error.message}`,
            severity: 'error'
          });
        }
      },
      error: (error) => {
        setImportStatus({
          open: true,
          message: `❌ ไม่สามารถอ่านไฟล์ CSV: ${error.message}`,
          severity: 'error'
        });
      }
    });

    // Reset input
    event.target.value = '';
  };

  // ฟังก์ชันที่ 3: Add New Sale
  const handleOpenAddDialog = () => {
    setFormData({
      OrderID: `ORD${String(salesData.length + 1).padStart(5, '0')}`,
      OrderDate: new Date().toISOString().split('T')[0],
      CustomerID: '',
      CustomerName: '',
      Region: 'Central',
      ProductID: '',
      ProductName: '',
      Category: 'Electronics',
      Quantity: 1,
      UnitPrice: 0,
      TotalPrice: 0,
    });
    setOpenAddDialog(true);
  };

  const handleAddSubmit = () => {
    const newSale = {
      ...formData,
      Quantity: parseInt(formData.Quantity),
      UnitPrice: parseFloat(formData.UnitPrice),
      TotalPrice: parseFloat(formData.Quantity) * parseFloat(formData.UnitPrice),
    };
    
    onAddSale(newSale);
    setOpenAddDialog(false);
    setSuccessMessage('✅ เพิ่มข้อมูลสำเร็จ!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // ฟังก์ชันที่ 8: Edit Sale
  const handleOpenEditDialog = (row) => {
    setSelectedRow(row);
    setFormData(row);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = () => {
    const updatedSale = {
      ...formData,
      Quantity: parseInt(formData.Quantity),
      UnitPrice: parseFloat(formData.UnitPrice),
      TotalPrice: parseFloat(formData.Quantity) * parseFloat(formData.UnitPrice),
    };
    
    onEditSale(updatedSale);
    setOpenEditDialog(false);
    setSuccessMessage('✅ แก้ไขข้อมูลสำเร็จ!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // ฟังก์ชันที่ 9: Delete Sale
  const handleOpenDeleteDialog = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteSale(selectedRow.OrderID);
    setOpenDeleteDialog(false);
    setSuccessMessage('✅ ลบข้อมูลสำเร็จ!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Form Input Handler
  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ฟังก์ชันที่ 7: Sort - DataGrid มี Sort ในตัวอยู่แล้ว
  // Define Columns for DataGrid
  const columns = [
    { field: 'OrderID', headerName: 'Order ID', width: 110 },
    { field: 'OrderDate', headerName: 'Date', width: 110 },
    { field: 'CustomerName', headerName: 'Customer', width: 150 },
    { 
      field: 'Region', 
      headerName: 'Region', 
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" variant="outlined" />
      )
    },
    { field: 'ProductName', headerName: 'Product', width: 180 },
    { 
      field: 'Category', 
      headerName: 'Category', 
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="secondary" variant="outlined" />
      )
    },
    { field: 'Quantity', headerName: 'Qty', width: 70, type: 'number' },
    { 
      field: 'UnitPrice', 
      headerName: 'Unit Price', 
      width: 110,
      type: 'number',
      valueFormatter: (params) => `฿${params.value.toFixed(2)}`,
    },
    { 
      field: 'TotalPrice', 
      headerName: 'Total', 
      width: 120,
      type: 'number',
      valueFormatter: (params) => `฿${params.value.toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary" onClick={() => handleOpenEditDialog(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleOpenDeleteDialog(params.row)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        📦 Data Management
      </Typography>

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {/* ฟังก์ชันที่ 5: Search */}
          <TextField
            placeholder="🔍 Search by Customer or Product..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          
          {/* ฟังก์ชันที่ 6: Filter by Region */}
          <TextField
            select
            label="🌍 Region"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="All">All Regions</MenuItem>
            {REGIONS.map(region => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </TextField>
          
          {/* ฟังก์ชันที่ 3: Add Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Add New
          </Button>
          
          {/* ฟังก์ชันที่ 12: Import CSV Button (NEW!) */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<UploadIcon />}
            onClick={handleImportClick}
          >
            Import CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileImport}
          />
          
          {/* ฟังก์ชันที่ 11: Export Button */}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
        </Stack>
        
        {/* Filter Info */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            📊 Showing {filteredData.length} of {salesData.length} records
            {searchQuery && ` | Search: "${searchQuery}"`}
            {filterRegion !== 'All' && ` | Region: ${filterRegion}`}
          </Typography>
        </Box>
      </Paper>

      {/* ฟังก์ชันที่ 4: Data Table with ฟังก์ชันที่ 7: Sort */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.OrderID}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Paper>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>➕ Add New Sale Entry</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <TextField label="Order ID" value={formData.OrderID} disabled />
            <TextField 
              label="Order Date" 
              type="date" 
              value={formData.OrderDate} 
              onChange={(e) => handleFormChange('OrderDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField 
              label="Customer ID" 
              value={formData.CustomerID} 
              onChange={(e) => handleFormChange('CustomerID', e.target.value)}
            />
            <TextField 
              label="Customer Name" 
              value={formData.CustomerName} 
              onChange={(e) => handleFormChange('CustomerName', e.target.value)}
              required
            />
            <TextField 
              select
              label="Region" 
              value={formData.Region} 
              onChange={(e) => handleFormChange('Region', e.target.value)}
            >
              {REGIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
            <TextField 
              label="Product ID" 
              value={formData.ProductID} 
              onChange={(e) => handleFormChange('ProductID', e.target.value)}
            />
            <TextField 
              label="Product Name" 
              value={formData.ProductName} 
              onChange={(e) => handleFormChange('ProductName', e.target.value)}
              required
            />
            <TextField 
              select
              label="Category" 
              value={formData.Category} 
              onChange={(e) => handleFormChange('Category', e.target.value)}
            >
              {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField 
              label="Quantity" 
              type="number" 
              value={formData.Quantity} 
              onChange={(e) => handleFormChange('Quantity', e.target.value)}
              required
            />
            <TextField 
              label="Unit Price" 
              type="number" 
              value={formData.UnitPrice} 
              onChange={(e) => handleFormChange('UnitPrice', e.target.value)}
              required
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Price: ฿{(formData.Quantity * formData.UnitPrice).toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>✏️ Edit Sale Entry</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <TextField label="Order ID" value={formData.OrderID} disabled />
            <TextField 
              label="Order Date" 
              type="date" 
              value={formData.OrderDate} 
              onChange={(e) => handleFormChange('OrderDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField label="Customer ID" value={formData.CustomerID} disabled />
            <TextField 
              label="Customer Name" 
              value={formData.CustomerName} 
              onChange={(e) => handleFormChange('CustomerName', e.target.value)}
            />
            <TextField 
              select
              label="Region" 
              value={formData.Region} 
              onChange={(e) => handleFormChange('Region', e.target.value)}
            >
              {REGIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
            <TextField label="Product ID" value={formData.ProductID} disabled />
            <TextField 
              label="Product Name" 
              value={formData.ProductName} 
              onChange={(e) => handleFormChange('ProductName', e.target.value)}
            />
            <TextField 
              select
              label="Category" 
              value={formData.Category} 
              onChange={(e) => handleFormChange('Category', e.target.value)}
            >
              {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField 
              label="Quantity" 
              type="number" 
              value={formData.Quantity} 
              onChange={(e) => handleFormChange('Quantity', e.target.value)}
            />
            <TextField 
              label="Unit Price" 
              type="number" 
              value={formData.UnitPrice} 
              onChange={(e) => handleFormChange('UnitPrice', e.target.value)}
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Price: ฿{(formData.Quantity * formData.UnitPrice).toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>🗑️ Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this sale entry?
          </Typography>
          {selectedRow && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2"><strong>Order ID:</strong> {selectedRow.OrderID}</Typography>
              <Typography variant="body2"><strong>Customer:</strong> {selectedRow.CustomerName}</Typography>
              <Typography variant="body2"><strong>Product:</strong> {selectedRow.ProductName}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Import Status Snackbar */}
      <Snackbar
        open={importStatus.open}
        autoHideDuration={6000}
        onClose={() => setImportStatus({ ...importStatus, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setImportStatus({ ...importStatus, open: false })} 
          severity={importStatus.severity}
          sx={{ width: '100%' }}
        >
          {importStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DataManagementPage;
