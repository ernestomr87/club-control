import type { ThemeConfig } from "antd";
import { theme } from "antd";

const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Color principal refinado: #207781 (teal sofisticado)
    colorPrimary: "#207781",
    colorPrimaryHover: "#1b656d",
    colorPrimaryActive: "#16535a",
    colorPrimaryBg: "#e6f7ff", // Azul claro sofisticado en lugar del cyan brillante
    colorPrimaryBgHover: "#bae6fd",
    colorPrimaryBorder: "#91d5ff",
    colorPrimaryBorderHover: "#69c0ff",
    colorPrimaryText: "#207781",
    colorPrimaryTextHover: "#1b656d",
    colorPrimaryTextActive: "#16535a",

    // Enlaces: usando el color principal
    colorLink: "#207781",
    colorLinkHover: "#1b656d",
    colorLinkActive: "#16535a",

    // Éxito: manteniendo emerald pero refinado
    colorSuccess: "#10b981",
    colorSuccessHover: "#0d9d6d",
    colorSuccessActive: "#0b815a",
    colorSuccessBg: "#d1fae5",
    colorSuccessBgHover: "#a7f3d0",
    colorSuccessBorder: "#6ee7b7",
    colorSuccessBorderHover: "#34d399",
    colorSuccessText: "#10b981",
    colorSuccessTextHover: "#0d9d6d",
    colorSuccessTextActive: "#0b815a",

    // Advertencia: ámbar sofisticado
    colorWarning: "#f59e0b",
    colorWarningHover: "#d08609",
    colorWarningActive: "#ab6e07",
    colorWarningBg: "#fef3c7",
    colorWarningBgHover: "#fde68a",
    colorWarningBorder: "#fcd34d",
    colorWarningBorderHover: "#fbbf24",
    colorWarningText: "#f59e0b",
    colorWarningTextHover: "#d08609",
    colorWarningTextActive: "#ab6e07",

    // Error: rojo refinado
    colorError: "#ef4444",
    colorErrorHover: "#cb3939",
    colorErrorActive: "#a72f2f",
    colorErrorBg: "#fee2e2",
    colorErrorBgHover: "#fecaca",
    colorErrorBorder: "#fca5a5",
    colorErrorBorderHover: "#f87171",
    colorErrorText: "#ef4444",
    colorErrorTextHover: "#cb3939",
    colorErrorTextActive: "#a72f2f",

    // Info: azul profesional
    colorInfo: "#3b82f6",
    colorInfoHover: "#326ed1",
    colorInfoActive: "#295bac",
    colorInfoBg: "#dbeafe",
    colorInfoBgHover: "#bfdbfe",
    colorInfoBorder: "#93c5fd",
    colorInfoBorderHover: "#60a5fa",
    colorInfoText: "#3b82f6",
    colorInfoTextHover: "#326ed1",
    colorInfoTextActive: "#295bac",

    // Tipografía refinada (Tailwind gray-700 base)
    colorTextBase: "#1f2937",
    colorText: "rgba(31, 41, 55, 0.88)",
    colorTextSecondary: "rgba(31, 41, 55, 0.65)",
    colorTextTertiary: "rgba(31, 41, 55, 0.45)",
    colorTextQuaternary: "rgba(31, 41, 55, 0.25)",
    colorTextDisabled: "rgba(31, 41, 55, 0.25)",

    // Fondo limpio y profesional
    colorBgBase: "#fafbfc",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorBgSpotlight: "rgba(31, 41, 55, 0.85)",
    colorBgMask: "rgba(31, 41, 55, 0.45)",

    // Bordes sutiles y modernos
    colorBorder: "#e2e8f0",
    colorBorderSecondary: "#f1f5f9",

    // Bordes redondeados elegantes
    borderRadius: 12,
    borderRadiusXS: 4,
    borderRadiusSM: 8,
    borderRadiusLG: 16,

    // Espaciado generoso
    paddingSM: 16,
    paddingLG: 28,

    // Sombras profundas y modernas (Tailwind-inspired)
    boxShadow:
      "0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    boxShadowSecondary:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

export default themeConfig;
