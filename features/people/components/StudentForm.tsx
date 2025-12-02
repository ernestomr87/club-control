'use client';

import { useActionState, useState, useEffect } from 'react';
import { 
  Form, Input, Button, Select, Switch, DatePicker, 
  Row, Col, Card, Typography, Divider, Space, Badge, Alert 
} from 'antd';
import { 
  UserOutlined, MailOutlined, PhoneOutlined, 
  SaveOutlined, TrophyOutlined, HomeOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

// Importamos nuestro Server Action y utilidades
import { createStudentAction } from '../actions';
import { getLevelColor } from '@/lib/utils/levels'; // El helper que creamos antes

const { Option } = Select;
const { Title, Text } = Typography;

export function StudentForm() {
  // Hook para conectar con el Server Action
  const [state, formAction, isPending] = useActionState(createStudentAction, null);
  
  // Estado local para controlar la visibilidad condicional (Switch)
  const [isAffiliate, setIsAffiliate] = useState(false);
  
  // Instancia del form de AntD para resetear campos tras éxito
  const [form] = Form.useForm();

  // Efecto para manejar errores que vienen del servidor
  useEffect(() => {
    if (state?.errors) {
      // Mapeamos los errores del servidor a los campos del form
      const formErrors = Object.entries(state.errors).map(([name, errors]) => ({
        name,
        errors: errors as string[],
      }));
      form.setFields(formErrors);
    }
    
    if (state?.message && !state.errors) {
       // Si hay mensaje y no hay errores de campo, es un error genérico (ej. BD caída)
       // Podríamos mostrar una notificación global aquí
    }
  }, [state, form]);

  return (
    <Card bordered={false} style={{ maxWidth: 900, margin: '0 auto', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={3} style={{ margin: 0, color: '#207781' }}>Nuevo Alumno</Title>
        <Text type="secondary">Registra un nuevo jugador en el club</Text>
      </div>

      {state?.message && (
        <Alert message={state.message} type="error" showIcon style={{ marginBottom: 24 }} />
      )}

      {/* Usamos form.submit() manual, pero el form nativo apunta a la action */}
      <Form
        form={form}
        layout="vertical"
        size="large"
        onFinish={(values) => {
            // Truco: AntD onFinish no envía FormData. 
            // Creamos un FormData manual o usamos un input hidden para submit nativo.
            // Opción "React 19 way": Usar el prop `action` en un tag <form> nativo
            // pero perderíamos los controles bonitos de AntD.
            // Solución híbrida experta:
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (values[key] !== undefined) {
                     // Formatear fechas a string ISO si es necesario
                    const val = values[key];
                    if (dayjs.isDayjs(val)) {
                        formData.append(key, val.format('YYYY-MM-DD'));
                    } else {
                        formData.append(key, val);
                    }
                }
            });
            // Disparamos el action manualmente (react wrapper)
            // Nota: startTransition o usar el hook useActionState directamente requiere
            // que el trigger sea un evento de form. 
            // Para simplificar hoy: usaremos un botón htmlType="submit" dentro de un <form action={formAction}> 
            // envolviendo inputs controlados.
            // PERO con Ant Design, es mejor usar `requestSubmit` en un ref de form oculto
        }}
      >
        {/* 
            WORKAROUND IMPORTANTE PARA ANTD + SERVER ACTIONS:
            Ant Design gestiona su propio estado. Para usar Server Actions nativos
            necesitamos inputs "name" reales en el DOM. 
            AntD los pone, así que solo necesitamos envolver todo en <form action={formAction}>
        */}
        <form action={formAction}>
            
            {/* SECCIÓN 1: DATOS PERSONALES */}
            <Divider orientation="horizontal" style={{ borderColor: '#e8e8e8' }}>
                <UserOutlined /> Datos Personales
            </Divider>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                    <Form.Item label="Nombre" name="firstName" required validateStatus={state?.errors?.firstName ? 'error' : ''} help={state?.errors?.firstName?.[0]}>
                        <Input name="firstName" placeholder="Ej. Rafael" prefix={<UserOutlined style={{color: '#bfbfbf'}}/>} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="Apellidos" name="lastName" required validateStatus={state?.errors?.lastName ? 'error' : ''} help={state?.errors?.lastName?.[0]}>
                        <Input name="lastName" placeholder="Ej. Nadal Parera" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                    <Form.Item label="Email" name="email" required validateStatus={state?.errors?.email ? 'error' : ''} help={state?.errors?.email?.[0]}>
                        <Input name="email" type="email" placeholder="rafa@example.com" prefix={<MailOutlined style={{color: '#bfbfbf'}}/>} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="Teléfono" name="phone" required validateStatus={state?.errors?.phone ? 'error' : ''} help={state?.errors?.phone?.[0]}>
                        <Input name="phone" placeholder="600 000 000" prefix={<PhoneOutlined style={{color: '#bfbfbf'}}/>} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                 <Col xs={24} md={12}>
                    {/* El DatePicker de AntD no tiene propiedad 'name' nativa que funcione bien con FormData directo.
                        Necesitamos un input oculto para pasar el valor al Server Action o usar un Controller.
                        Truco rápido: Input hidden sincronizado */}
                    <Form.Item label="Fecha Nacimiento" name="birthDate_visual">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" onChange={(date, dateString) => {
                            const input = document.getElementById('hidden_birthDate') as HTMLInputElement;
                            if(input) input.value = date ? date.format('YYYY-MM-DD') : '';
                        }}/>
                    </Form.Item>
                    <input type="hidden" name="birthDate" id="hidden_birthDate" />
                 </Col>
                 <Col xs={24} md={12}>
                     <Form.Item label="Dirección" name="address_street">
                         <Input name="address.street" placeholder="C/ Manacor, 12" prefix={<HomeOutlined style={{color: '#bfbfbf'}}/>} />
                         {/* Nota: Para anidar en Zod (address.street), necesitamos procesar el FormData en el action 
                             o usar nombres planos address_street y reconstruir el objeto en el servidor.
                             Recomiendo nombres planos: name="address_street" */}
                     </Form.Item>
                 </Col>
            </Row>

            {/* SECCIÓN 2: PERFIL DEPORTIVO */}
            <Divider orientation="horizontal" style={{ borderColor: '#e8e8e8', marginTop: 32 }}>
                <TrophyOutlined /> Perfil Deportivo
            </Divider>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                    <Form.Item label="Nivel de Juego" name="level" initialValue="inicial_2_2.25">
                        {/* Este Select NO envía valor al action directamente. Usamos input hidden */}
                        <Select 
                            onChange={(val) => {
                                const input = document.getElementById('hidden_level') as HTMLInputElement;
                                if(input) input.value = val;
                            }}
                            defaultValue="inicial_2_2.25"
                        >
                            <Option value="inicial_2_2.25">
                                <Space><Badge color={getLevelColor('inicial_2_2.25')} /> Inicial (2.0 - 2.25)</Space>
                            </Option>
                            <Option value="inicial_2.25_2.5">
                                <Space><Badge color={getLevelColor('inicial_2.25_2.5')} /> Inicial+ (2.25 - 2.5)</Space>
                            </Option>
                            <Option value="intermedio_2.5_3.0">
                                <Space><Badge color={getLevelColor('intermedio_2.5_3.0')} /> Intermedio (2.5 - 3.0)</Space>
                            </Option>
                            <Option value="intermedio_adv_3.0_3.5">
                                <Space><Badge color={getLevelColor('intermedio_adv_3.0_3.5')} /> Intermedio Adv. (3.0 - 3.5)</Space>
                            </Option>
                            <Option value="avanzado_3.5_4.0">
                                <Space><Badge color={getLevelColor('avanzado_3.5_4.0')} /> Avanzado (3.5 - 4.0)</Space>
                            </Option>
                            <Option value="master_plus_4.0">
                                <Space><Badge color={getLevelColor('master_plus_4.0')} /> Master (+4.0)</Space>
                            </Option>
                        </Select>
                    </Form.Item>
                    <input type="hidden" name="level" id="hidden_level" defaultValue="inicial_2_2.25" />
                </Col>
                
                <Col xs={24} md={12}>
                    <Form.Item label="Mano de Juego" name="playHand" initialValue="derecha">
                        <Select 
                            onChange={(val) => {
                                const input = document.getElementById('hidden_playHand') as HTMLInputElement;
                                if(input) input.value = val;
                            }}
                            defaultValue="derecha"
                        >
                            <Option value="derecha">Derecha (Diestro)</Option>
                            <Option value="reves">Izquierda (Zurdo)</Option>
                        </Select>
                    </Form.Item>
                    <input type="hidden" name="playHand" id="hidden_playHand" defaultValue="derecha" />
                </Col>
            </Row>

            {/* SECCIÓN 3: AFILIACIÓN (CONDICIONAL) */}
            <Card 
                type="inner" 
                size="small" 
                style={{ marginTop: 16, backgroundColor: isAffiliate ? '#f6ffed' : '#f5f5f5', borderColor: isAffiliate ? '#b7eb8f' : '#d9d9d9', transition: 'all 0.3s' }}
            >
                <Row align="middle" justify="space-between">
                    <Col>
                        <Space direction="vertical" size={0}>
                            <Text strong>¿Es socio afiliado?</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>Los afiliados pagan cuota anual y tienen descuentos</Text>
                        </Space>
                    </Col>
                    <Col>
                         <Switch 
                            checked={isAffiliate} 
                            onChange={(checked) => {
                                setIsAffiliate(checked);
                                // Actualizamos input hidden para el FormData
                                const input = document.getElementById('hidden_isAffiliate') as HTMLInputElement;
                                if(input) input.value = checked ? 'on' : '';
                            }} 
                            checkedChildren="SÍ" 
                            unCheckedChildren="NO" 
                        />
                        <input type="hidden" name="isAffiliate" id="hidden_isAffiliate" value={isAffiliate ? 'on' : ''} />
                    </Col>
                </Row>

                {/* Animación simple de despliegue */}
                <div style={{ 
                    maxHeight: isAffiliate ? 100 : 0, 
                    opacity: isAffiliate ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    marginTop: isAffiliate ? 16 : 0 
                }}>
                    <Divider style={{ margin: '12px 0' }} dashed />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                label="Fecha de Afiliación" 
                                required={isAffiliate}
                                validateStatus={state?.errors?.affiliationDate ? 'error' : ''}
                                help={state?.errors?.affiliationDate?.[0]}
                            >
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    placeholder="Selecciona fecha"
                                    onChange={(date) => {
                                        const input = document.getElementById('hidden_affiliationDate') as HTMLInputElement;
                                        if(input) input.value = date ? date.format('YYYY-MM-DD') : '';
                                    }}
                                />
                            </Form.Item>
                            <input type="hidden" name="affiliationDate" id="hidden_affiliationDate" />
                        </Col>
                        <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Alert message="Cuota anual: 35€ (se prorrateará)" type="info" showIcon style={{ width: '100%' }} />
                        </Col>
                    </Row>
                </div>
            </Card>

            <Divider />

            <div style={{ textAlign: 'right' }}>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SaveOutlined />} 
                    size="large"
                    loading={isPending}
                    style={{ backgroundColor: '#207781', minWidth: 150 }}
                >
                    {isPending ? 'Guardando...' : 'Crear Alumno'}
                </Button>
            </div>
        </form>
      </Form>
    </Card>
  );
}
