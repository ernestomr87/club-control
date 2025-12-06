"use client";

import { useActionState } from "react";
import { loginAction, AuthState } from "../actions"; // Asegúrate de importar tu acción real
import { Button, Form, Input, Alert, Card, Typography, Divider } from "antd";
import { LockOutlined, UserOutlined, GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";

// Estado inicial para el hook
const initialState: AuthState = { error: null };

export function LoginForm() {
  // useActionState gestiona el ciclo de vida del Server Action:
  // state: el resultado devuelto por la acción (error o éxito)
  // formAction: la función que conectamos al <form>
  // isPending: booleano true mientras la acción se ejecuta
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)", // Sombra suave y moderna
        borderRadius: 12,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {/* Aquí podrías poner tu Logo <Image /> */}
        <Typography.Title level={3} style={{ color: "#207781", margin: 0 }}>
          Bienvenido de nuevo
        </Typography.Title>
        <Typography.Text type="secondary">
          Ingresa a tu panel de control
        </Typography.Text>
      </div>

      {/* Feedback de Error */}
      {state.error && (
        <Alert
          message={state.error}
          type="error"
          showIcon
          style={{ marginBottom: 20, borderRadius: 6 }}
        />
      )}

      <form action={formAction}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Campo Email */}
          <Form.Item
            style={{ marginBottom: 0 }}
            validateStatus={state.error ? "error" : ""}
          >
            <Input
              name="email"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Correo electrónico"
              size="large"
              type="email"
              autoComplete="email"
              required
            />
          </Form.Item>

          {/* Campo Password */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Input.Password
              name="password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Contraseña"
              size="large"
              autoComplete="current-password"
              required
            />
          </Form.Item>

          {/* Link de "Olvidé mi contraseña" */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/forgot-password"
              style={{ fontSize: 13, color: "#595959" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón Principal */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isPending}
            style={{
              backgroundColor: "#207781",
              height: 48,
              fontWeight: 600,
            }}
          >
            {isPending ? "Entrando..." : "Iniciar Sesión"}
          </Button>
        </div>
      </form>

      <Divider plain style={{ fontSize: 13, color: "#8c8c8c" }}>
        O continúa con
      </Divider>

      {/* Botón Social (Opcional - Ejemplo de estructura) */}
      <Button
        block
        size="large"
        icon={<GoogleOutlined />}
        style={{ marginBottom: 24 }}
        onClick={() => {
          // Aquí llamarías a una función de supabase.auth.signInWithOAuth
          console.log("Implementar OAuth con Google");
        }}
      >
        Google
      </Button>

      <div style={{ textAlign: "center" }}>
        <Typography.Text type="secondary">
          ¿Aún no tienes cuenta?{" "}
        </Typography.Text>
        <Link href="/register" style={{ color: "#207781", fontWeight: 600 }}>
          Regístrate gratis
        </Link>
      </div>
    </Card>
  );
}
