/**
 * ฟังก์ชันที่ 2: Login Page (UI Mockup)
 * หน้า Login ที่มี Username และ Password
 * (ไม่ต้องเชื่อมกับฐานข้อมูลจริง)
 */

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Avatar,
} from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!username || !password) {
      setError('กรุณากรอก Username และ Password');
      return;
    }

    // Mock login - รับ username/password อะไรก็ได้
    const success = onLogin(username, password);
    
    if (success) {
      setError('');
    } else {
      setError('Login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Avatar Icon */}
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockIcon />
            </Avatar>

            {/* Title */}
            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              🛒 Sales Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              E-commerce Sales Analysis System
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
              >
                เข้าสู่ระบบ (Login)
              </Button>

              {/* Demo Credentials */}
              <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  💡 <strong>สำหรับ Demo:</strong> ใส่ Username และ Password อะไรก็ได้
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography 
          variant="body2" 
          color="white" 
          align="center" 
          sx={{ mt: 3 }}
        >
          © 2024 E-commerce Sales Dashboard | โปรเจกต์นักศึกษา
        </Typography>
      </Container>
    </Box>
  );
}

export default LoginPage;
