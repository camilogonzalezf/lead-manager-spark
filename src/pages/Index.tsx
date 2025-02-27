
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Form, 
  Input, 
  Typography, 
  Card, 
  Divider, 
  notification,
  ConfigProvider
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock user data
const MOCK_USER = {
  email: 'admin@example.com',
  password: 'password123'
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = (values: { email: string; password: string }) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (values.email === MOCK_USER.email && values.password === MOCK_USER.password) {
        notification.success({
          message: 'Inicio de sesión exitoso',
          description: 'Bienvenido al sistema de administración de Feinforce',
        });
        // In a real app, you would set auth tokens/user data in context or store
        // Redirect to dashboard (to be implemented)
        // navigate('/dashboard');
      } else {
        notification.error({
          message: 'Error de autenticación',
          description: 'Email o contraseña incorrectos. Por favor intente nuevamente.',
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    // Simulate password recovery
    const email = form.getFieldValue('email');
    if (!email) {
      notification.info({
        message: 'Introduce tu email',
        description: 'Por favor, introduce tu email primero para recuperar tu contraseña.',
      });
      return;
    }
    
    notification.success({
      message: 'Recuperación de contraseña',
      description: `Se ha enviado un correo de recuperación a ${email}`,
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#30c463',
          colorInfo: '#141748',
        },
      }}
    >
      <div className="login-page">
        <Card className="login-card">
          <div className="logo-container">
            <img 
              src="/lovable-uploads/233d4a25-8470-427a-a566-9e4f674a9a05.png" 
              alt="Feinforce Logo" 
              className="logo"
            />
          </div>
          
          <Title level={3} className="login-title">Admin Feinforce</Title>
          <Text type="secondary" className="login-subtitle">
            Sistema de gestión inmobiliaria
          </Text>
          
          <Divider />
          
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor introduce tu email' },
                { type: 'email', message: 'Introduce un email válido' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor introduce tu contraseña' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Contraseña" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="link" 
                onClick={handleForgotPassword}
                className="forgot-password"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
                className="login-button"
              >
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
          
          <div className="login-footer">
            <Text type="secondary">Feinforce © {new Date().getFullYear()}</Text>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default Index;
