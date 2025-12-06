"use client";

import { useActionState, useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  DatePicker,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Space,
  Badge,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  TrophyOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// Importamos nuestro Server Action y utilidades
import { createStudentAction } from "../actions";
import { getLevelColor } from "@/lib/utils/levels";

const { Option } = Select;
const { Title, Text } = Typography;

export function StudentForm() {
  // Hook para conectar con el Server Action
  const [state, formAction, isPending] = useActionState(
    createStudentAction,
    null
  );

  // Estado local para controlar la visibilidad condicional (Switch)
  const [isAffiliate, setIsAffiliate] = useState(false);

  // Efecto para manejar errores que vienen del servidor
  useEffect(() => {
    if (state?.errors) {
      // Log errors for debugging
      console.error("Form validation errors:", state.errors);
    }

    if (state?.message && !state.errors) {
      // Si hay mensaje y no hay errores de campo, es un error genérico (ej. BD caída)
      console.error("Form submission error:", state.message);
    }
  }, [state]);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={3} style={{ margin: 0, color: "#207781" }}>
          Nuevo Alumno
        </Title>
        <Text type="secondary">Registra un nuevo jugador en el club</Text>
      </div>

      {state?.message && (
        <Alert
          message={state.message}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Native form with server action */}
      <form action={formAction} style={{ width: "100%" }}>
        {/* SECCIÓN 1: DATOS PERSONALES */}
        <Divider orientation="horizontal" style={{ borderColor: "#e8e8e8" }}>
          <UserOutlined /> Datos Personales
        </Divider>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nombre"
              name="firstName"
              required
              validateStatus={state?.errors?.firstName ? "error" : ""}
              help={state?.errors?.firstName?.[0]}
            >
              <Input
                name="firstName"
                placeholder="Ej. Rafael"
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Apellidos"
              name="lastName"
              required
              validateStatus={state?.errors?.lastName ? "error" : ""}
              help={state?.errors?.lastName?.[0]}
            >
              <Input name="lastName" placeholder="Ej. Nadal Parera" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              required
              validateStatus={state?.errors?.email ? "error" : ""}
              help={state?.errors?.email?.[0]}
            >
              <Input
                name="email"
                type="email"
                placeholder="rafa@example.com"
                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Teléfono"
              name="phone"
              required
              validateStatus={state?.errors?.phone ? "error" : ""}
              help={state?.errors?.phone?.[0]}
            >
              <Input
                name="phone"
                placeholder="600 000 000"
                prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            {/* El DatePicker de AntD no tiene propiedad 'name' nativa que funcione bien con FormData directo.
                        Necesitamos un input oculto para pasar el valor al Server Action o usar un Controller.
                        Truco rápido: Input hidden sincronizado */}
            <Form.Item label="Fecha Nacimiento" name="birthDate_visual">
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  const input = document.getElementById(
                    "hidden_birthDate"
                  ) as HTMLInputElement;
                  if (input)
                    input.value = date ? date.format("YYYY-MM-DD") : "";
                }}
              />
            </Form.Item>
            <input type="hidden" name="birthDate" id="hidden_birthDate" />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Cuenta Bancaria" name="bankAccount">
              <Input
                name="bankAccount"
                placeholder="ES00 0000 0000 0000 0000 0000"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Address Section */}
        <Divider
          orientation="horizontal"
          style={{ borderColor: "#e8e8e8", marginTop: 16 }}
        >
          <HomeOutlined /> Dirección
        </Divider>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Calle" name="address_street">
              <Input name="address_street" placeholder="C/ Manacor, 12" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Código Postal" name="address_zipCode">
              <Input name="address_zipCode" placeholder="07500" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Ciudad" name="address_city">
              <Input name="address_city" placeholder="Manacor" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Provincia" name="address_province">
              <Input name="address_province" placeholder="Baleares" />
            </Form.Item>
          </Col>
        </Row>

        {/* SECCIÓN 2: PERFIL DEPORTIVO */}
        <Divider
          orientation="horizontal"
          style={{ borderColor: "#e8e8e8", marginTop: 32 }}
        >
          <TrophyOutlined /> Perfil Deportivo
        </Divider>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nivel de Juego"
              name="level"
              initialValue="inicial_2_2.25"
            >
              {/* Este Select NO envía valor al action directamente. Usamos input hidden */}
              <Select
                onChange={(val) => {
                  const input = document.getElementById(
                    "hidden_level"
                  ) as HTMLInputElement;
                  if (input) input.value = val;
                }}
              >
                <Option value="inicial_2_2.25">
                  <Space>
                    <Badge color={getLevelColor("inicial_2_2.25")} /> Inicial
                    (2.0 - 2.25)
                  </Space>
                </Option>
                <Option value="inicial_2.25_2.5">
                  <Space>
                    <Badge color={getLevelColor("inicial_2.25_2.5")} /> Inicial+
                    (2.25 - 2.5)
                  </Space>
                </Option>
                <Option value="intermedio_2.5_3.0">
                  <Space>
                    <Badge color={getLevelColor("intermedio_2.5_3.0")} />{" "}
                    Intermedio (2.5 - 3.0)
                  </Space>
                </Option>
                <Option value="intermedio_adv_3.0_3.5">
                  <Space>
                    <Badge color={getLevelColor("intermedio_adv_3.0_3.5")} />{" "}
                    Intermedio Adv. (3.0 - 3.5)
                  </Space>
                </Option>
                <Option value="avanzado_3.5_4.0">
                  <Space>
                    <Badge color={getLevelColor("avanzado_3.5_4.0")} /> Avanzado
                    (3.5 - 4.0)
                  </Space>
                </Option>
                <Option value="master_plus_4.0">
                  <Space>
                    <Badge color={getLevelColor("master_plus_4.0")} /> Master
                    (+4.0)
                  </Space>
                </Option>
              </Select>
            </Form.Item>
            <input type="hidden" name="level" id="hidden_level" />
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Mano de Juego"
              name="playHand"
              initialValue="derecha"
            >
              <Select
                onChange={(val) => {
                  const input = document.getElementById(
                    "hidden_playHand"
                  ) as HTMLInputElement;
                  if (input) input.value = val;
                }}
              >
                <Option value="derecha">Derecha (Diestro)</Option>
                <Option value="reves">Izquierda (Zurdo)</Option>
              </Select>
            </Form.Item>
            <input type="hidden" name="playHand" id="hidden_playHand" />
          </Col>
        </Row>

        {/* SECCIÓN 3: AFILIACIÓN (CONDICIONAL) */}
        <Divider
          orientation="horizontal"
          style={{ borderColor: "#e8e8e8", marginTop: 32 }}
        >
          ¿Es socio afiliado?
        </Divider>

        <Card
          type="inner"
          size="small"
          style={{
            marginTop: 16,
            backgroundColor: isAffiliate ? "#f6ffed" : "#f5f5f5",
            borderColor: isAffiliate ? "#b7eb8f" : "#d9d9d9",
            transition: "all 0.3s",
          }}
        >
          <Row align="middle" justify="space-between" gutter={16}>
            <Col flex="auto">
              <Space size={0}>
                <Text strong>Afiliación al Club</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Los afiliados pagan cuota anual y tienen descuentos
                </Text>
              </Space>
            </Col>
            <Col>
              <Switch
                checked={isAffiliate}
                onChange={(checked) => {
                  setIsAffiliate(checked);
                  const input = document.getElementById(
                    "hidden_isAffiliate"
                  ) as HTMLInputElement;
                  if (input) input.value = checked ? "on" : "";
                }}
                checkedChildren="SÍ"
                unCheckedChildren="NO"
              />
              <input
                type="hidden"
                name="isAffiliate"
                id="hidden_isAffiliate"
                value={isAffiliate ? "on" : ""}
              />
            </Col>
          </Row>

          {/* Expandable section */}
          {isAffiliate && (
            <>
              <Divider style={{ margin: "16px 0" }} dashed />
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Fecha de Afiliación"
                    required={isAffiliate}
                    validateStatus={
                      state?.errors?.affiliationDate ? "error" : ""
                    }
                    help={state?.errors?.affiliationDate?.[0]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Selecciona fecha"
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        const input = document.getElementById(
                          "hidden_affiliationDate"
                        ) as HTMLInputElement;
                        if (input)
                          input.value = date ? date.format("YYYY-MM-DD") : "";
                      }}
                    />
                  </Form.Item>
                  <input
                    type="hidden"
                    name="affiliationDate"
                    id="hidden_affiliationDate"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Alert
                    message="Cuota anual: 35€"
                    description="La cuota se prorrateará según la fecha de alta"
                    type="info"
                    showIcon
                    style={{ marginTop: 8 }}
                  />
                </Col>
              </Row>
            </>
          )}
        </Card>

        <Divider />

        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            loading={isPending}
            style={{ backgroundColor: "#207781", minWidth: 150 }}
          >
            {isPending ? "Guardando..." : "Crear Alumno"}
          </Button>
        </div>
      </form>
    </>
  );
}
