import type { ThemeConfig } from "antd";
import { theme } from "antd";

// Colors extracted and refined from the "Levante Padel Academy" Brand Identity
// Strategy: "Premium Sport" - High contrast, accessible, and energetic without visual fatigue.

// 1. Brand Navy (Authority, Trust, Backgrounds of Logo)
const BRAND_NAVY = "#1E2A45"; // Deep, rich blue-gray
const BRAND_NAVY_DARK = "#0F172A";
const BRAND_NAVY_LIGHT = "#334155";

// 2. Kinetics Orange (Energy, Padel Racket, Action)
// Tuned to be vibrant but not neon/blinding.
const BRAND_ORANGE = "#FF5722"; // Deep Orange 500 equivalent - Sporty & Professional
const BRAND_ORANGE_HOVER = "#F4511E";
const BRAND_ORANGE_ACTIVE = "#E64A19";
const BRAND_ORANGE_BG = "#FFF7F5"; // Warm, subtle background for active items

const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // PRIMARY COLOR: The "Call to Action"
    // We use the Orange to drive conversion and focus, matching the "Action" of Padel.
    colorPrimary: BRAND_ORANGE,
    colorPrimaryHover: BRAND_ORANGE_HOVER,
    colorPrimaryActive: BRAND_ORANGE_ACTIVE,
    colorPrimaryBg: BRAND_ORANGE_BG,
    colorPrimaryBgHover: "#FFCCBC",
    colorPrimaryBorder: "#FFAB91",
    colorPrimaryBorderHover: "#FF8A65",
    colorPrimaryText: BRAND_ORANGE,
    colorPrimaryTextHover: BRAND_ORANGE_HOVER,
    colorPrimaryTextActive: BRAND_ORANGE_ACTIVE,

    // LINKS
    // Distinct from text, utilizing the brand's energy.
    colorLink: BRAND_ORANGE,
    colorLinkHover: BRAND_ORANGE_HOVER,
    colorLinkActive: BRAND_ORANGE_ACTIVE,

    // SUCCESS (Growth/Positive)
    // A sophisticated Emerald that pairs well with Navy and Orange.
    colorSuccess: "#10B981",
    colorSuccessBg: "#ECFDF5",
    colorSuccessBorder: "#A7F3D0",

    // WARNING (Attention)
    // Golden Amber - distinct from the orange primary but harmonious.
    colorWarning: "#F59E0B",
    colorWarningBg: "#FFFBEB",
    colorWarningBorder: "#FDE68A",

    // ERROR (Critical)
    // A clean Red-Pink to cut through the noise, distinct from the Orange.
    colorError: "#EF4444",
    colorErrorBg: "#FEF2F2",
    colorErrorBorder: "#FECACA",

    // INFO (Neutral/System)
    // Using the Brand Navy to reinforce identity in information alerts.
    colorInfo: BRAND_NAVY,
    colorInfoBg: "#F1F5F9",
    colorInfoBorder: "#CBD5E1",

    // TYPOGRAPHY
    // The most critical part for "Not disturbing the view".
    // We eschew pure black for the Brand Navy, creating a softer, cohesive reading experience.
    colorTextBase: BRAND_NAVY_DARK,
    colorText: "rgba(15, 23, 42, 0.88)", // Main text - Slate 900-ish
    colorTextSecondary: "rgba(30, 42, 69, 0.65)", // Secondary - softer Navy
    colorTextTertiary: "rgba(30, 42, 69, 0.45)",
    colorTextQuaternary: "rgba(30, 42, 69, 0.25)",

    // BACKGROUNDS
    // Clean, crisp, professional.
    colorBgBase: "#F8FAFC", // Cool Slate White - fresher than warm white
    colorBgContainer: "#FFFFFF",
    colorBgLayout: "#F1F5F9", // Distinct layout bg
    colorBgElevated: "#FFFFFF",

    // BORDERS
    // Subtle definition.
    colorBorder: "#E2E8F0",
    colorBorderSecondary: "#F1F5F9",

    // SHAPES & SPACING
    // "Modern Sport" Aesthetics = Rounded but precise.
    borderRadius: 10, // A balanced curve, not too playful (bubble) nor too rigid (square).
    borderRadiusXS: 4,
    borderRadiusSM: 6,
    borderRadiusLG: 16,

    // SHADOWS
    // Soft, diffused shadows using the Navy tone for depth, not gray.
    boxShadow:
      "0 4px 6px -1px rgba(30, 42, 69, 0.1), 0 2px 4px -1px rgba(30, 42, 69, 0.06)",
    boxShadowSecondary:
      "0 10px 15px -3px rgba(30, 42, 69, 0.1), 0 4px 6px -2px rgba(30, 42, 69, 0.05)",

    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Button: {
      colorPrimary: BRAND_ORANGE,
      algorithm: true, // Enable default button algorithms
      fontWeight: 600, // Stronger buttons
      controlHeight: 40, // Larger, friendlier touch targets
    },
    Card: {
      headerFontSize: 18,
    },
    Typography: {
      fontFamilyCode: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },
};

export default themeConfig;
