"use client";

import {
  Truck,
  Drop,
  Wrench,
  SwimmingPool,
  Clock,
  Lightning,
  ShieldCheck,
  Tag,
  Handshake,
  Phone,
  WhatsappLogo,
  InstagramLogo,
  EnvelopeSimple,
  CaretRight,
  CaretDown,
  MapPin,
  CheckCircle,
  List,
  X,
  Star,
  House,
  CalendarBlank,
  Users,
  CurrencyCircleDollar,
  SignOut,
  Plus,
  PencilSimple,
  Trash,
  ArrowLeft,
  DownloadSimple,
  ShareFat,
  Bank,
  Receipt,
  WarningCircle,
  Warning,
  Wallet,
  HandCoins,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

const map = {
  Truck,
  Drop,
  Wrench,
  SwimmingPool,
  Clock,
  Lightning,
  ShieldCheck,
  Tag,
  Handshake,
  Phone,
  WhatsappLogo,
  InstagramLogo,
  EnvelopeSimple,
  CaretRight,
  CaretDown,
  MapPin,
  CheckCircle,
  List,
  X,
  Star,
  House,
  CalendarBlank,
  Users,
  CurrencyCircleDollar,
  SignOut,
  Plus,
  PencilSimple,
  Trash,
  ArrowLeft,
  DownloadSimple,
  ShareFat,
  Bank,
  Receipt,
  WarningCircle,
  Warning,
  Wallet,
  HandCoins,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof map;

type Props = {
  name: IconName | (string & {});
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};

export function Icon({ name, size = 24, weight = "fill", className }: Props) {
  const Cmp = map[name as IconName];
  if (!Cmp) return null;
  return <Cmp size={size} weight={weight} className={className} />;
}
