import {
  Package,
  Zap,
  CircuitBoard,
  Radar,
  Cable,
  BatteryCharging,
  Cog,
  Cpu,
} from "lucide-react";

export const API_BASE = "https://admin.circuitbay.org/api/public";

export const WHATSAPP_PHONE = "918281461307";
export const INSTAGRAM_URL = "https://www.instagram.com/circuitbayofficial";
export const INSTAGRAM_HANDLE = "@circuitbayofficial";
export const EMAIL = "circuitbayofficial@gmail.com";
export const PHONE = "+918281461307";
export const PHONE_DISPLAY = "+91 82814 61307";

export const CATEGORIES = [
  { key: "all", label: "All", icon: Package },
  { key: "Electronics", label: "Electronics", icon: Zap },
  { key: "Development Boards", label: "Dev Boards", icon: CircuitBoard },
  { key: "Sensors", label: "Sensors", icon: Radar },
  { key: "Cables & Connectors", label: "Cables", icon: Cable },
  { key: "Power Supply", label: "Power", icon: BatteryCharging },
  { key: "Actuators", label: "Actuators", icon: Cog },
];

export const CATEGORY_ICON_MAP = {
  Electronics: Zap,
  "Development Boards": CircuitBoard,
  Sensors: Radar,
  "Cables & Connectors": Cable,
  "Power Supply": BatteryCharging,
  Actuators: Cog,
};

export function getCategoryIcon(category) {
  return CATEGORY_ICON_MAP[category] || Cpu;
}

export function getWhatsAppUrl(productName) {
  return `//api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=Hi, I would love to buy/know about this ${encodeURIComponent(productName)}`;
}
