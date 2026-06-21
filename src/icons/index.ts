/**
 * Crate uses Phosphor Icons. Consumers can import any icon straight from
 * `@phosphor-icons/react`; the most common ones are re-exported here for convenience,
 * and `ThemeProvider` sets sensible defaults (1em size, currentColor, regular weight)
 * via Phosphor's IconContext so icons inherit text size and color automatically.
 *
 * Directional icons (carets, arrows) accept Phosphor's `mirrored` prop for RTL.
 */
export {
  IconContext,
  type Icon,
  type IconProps,
  type IconWeight,
  // navigation / chrome
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  X,
  MagnifyingGlass,
  ArrowRight,
  ArrowLeft,
  DotsThree,
  Plus,
  Check,
  // status
  Info,
  CheckCircle,
  Warning,
  WarningCircle,
  XCircle,
  // trust / cargoz
  SealCheck,
  ShieldCheck,
  Star,
  Phone,
  WhatsappLogo,
  MapPin,
  Package,
  CalendarBlank,
  Truck,
  Buildings,
} from "@phosphor-icons/react";

/** Recommended IconContext defaults (already applied by ThemeProvider). */
export const ICON_DEFAULTS = {
  color: "currentColor",
  size: "1em",
  weight: "regular",
} as const;
