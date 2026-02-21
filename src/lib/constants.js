import {
  Zap,
  CircuitBoard,
  Radar,
  Cable,
  BatteryCharging,
  Cog,
  Cpu,
  Monitor,
  SlidersHorizontal,
} from "lucide-react";

export const API_BASE = "https://admin.circuitbay.org/api/public";

export const WHATSAPP_PHONE = "918281461307";
export const INSTAGRAM_URL = "https://www.instagram.com/circuitbayofficial";
export const INSTAGRAM_HANDLE = "@circuitbayofficial";
export const EMAIL = "circuitbayofficial@gmail.com";
export const PHONE = "+918281461307";
export const PHONE_DISPLAY = "+91 82814 61307";

export const CATEGORY_ICON_MAP = {
  Electronics: Zap,
  "Development Boards": CircuitBoard,
  Sensors: Radar,
  "Cables & Connectors": Cable,
  "Power Supply": BatteryCharging,
  Actuators: Cog,
  "Peripheral Devices": Monitor,
  "Controllers & Drivers": SlidersHorizontal,
};

export function getCategoryIcon(category) {
  return CATEGORY_ICON_MAP[category] || Cpu;
}

export function getWhatsAppUrl(productName) {
  return `//api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=Hi, I would love to buy/know about this ${encodeURIComponent(productName)}`;
}
