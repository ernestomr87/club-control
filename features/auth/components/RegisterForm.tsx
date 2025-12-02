'use client';

import { useActionState } from 'react';
import { registerAction, AuthState } from '../actions'; // Importa tu action de registro
import { Button, Form, Input, Alert, Card, Typography } from 'antd';
import { UserAddOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

const initialState: AuthState = { error: null, success: false };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  // Si el registro es exitoso, mostramos mensaje en lugar del form
  if (state.success) {
    return (
      <Card style={{ width: 400, textAlign: 'center' }}>
        <Typography.Title level={3} style={{ color: '#207781' }}>
          ¡Casi listo!
        </Typography.Title>
        <Typography.Paragraph>
          Te hemos enviado un enlace de confirmación a tu correo electrónico.
          Por favor, revísalo para activar tu cuenta.
        </Typography.Paragraph>
        <Link href="/login">
            <Button type="default">Volver al Login</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card 
      style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      title={<Typography.Title level={3} style={{ textAlign: 'center', color: '#207781' }}>Crear Cuenta</Typography.Title>}
    >
      {state.error && (
        <Alert message={state.error} type="error" showIcon style={{ marginBottom: 20 }} />
      )}

      <form action={formAction}>
        <Form.Item name="email" rules={[{ required: true, message: 'Introduce tu email' }]}>
            <Input 
                name="email" 
                prefix={<MailOutlined />} 
                placeholder="Tu mejor email" 
                size="large" 
                type="email"
            />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password 
                name="password" 
                prefix={<LockOutlined />} 
                placeholder="Contraseña (mín. 6 caracteres)" 
                size="large" 
            />
        </Form.Item>
        
        {/* Tip: Podrías añadir campo "Confirmar Password" y validarlo en el server action con Zod .refine() */}

        <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large" 
            loading={isPending}
            icon={<UserAddOutlined />}
            style={{ backgroundColor: '#207781', marginTop: 10 }}
        >
            Registrarme
        </Button>
        
        <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Typography.Text type="secondary">¿Ya tienes cuenta? </Typography.Text>
            <Link href="/login" style={{ color: '#207781' }}>Inicia Sesión</Link>
        </div>
      </form>
    </Card>
  );
}
