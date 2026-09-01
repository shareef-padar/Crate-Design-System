// Crate Design System — public API.
// Consumers also import the stylesheet once: import "@cargoz/crate/styles.css";

export * from "./theme";

// Icons (Phosphor) — curated re-exports + IconContext defaults
export * from "./icons";

// Layout primitives
export * from "./primitives/Box";
export * from "./primitives/Stack";
export * from "./primitives/Inline";
export * from "./primitives/Container";
export * from "./primitives/Grid";

// Typography
export * from "./components/Text";
export * from "./components/Heading";

// Components
export * from "./components/Spinner";
export * from "./components/Button";
export * from "./components/IconButton";
export * from "./components/Badge";
export * from "./components/Tag";
export * from "./components/CountBadge";
export * from "./components/Card";
export * from "./components/Link";
export * from "./components/Avatar";
export * from "./components/ProgressBar";
export * from "./components/Breadcrumbs";
export * from "./components/List";
export * from "./components/Banner";
export * from "./components/Pagination";
export * from "./components/Accordion";
export * from "./components/RangeSlider";
export * from "./components/Timeline";
export * from "./components/Autocomplete";

// Overlays & feedback
export * from "./components/Alert";
export * from "./components/Skeleton";
export * from "./components/Tooltip";
export * from "./components/Modal";
export * from "./components/Tabs";
export * from "./components/Table";
export * from "./components/Toast";

// Form controls
export * from "./components/FormField";
export * from "./components/Input";
export * from "./components/Textarea";
export * from "./components/Select";
export * from "./components/DatePicker";
export * from "./components/Checkbox";
export * from "./components/Radio";
export * from "./components/Switch";
export * from "./components/SegmentedControl";
export * from "./components/Stepper";

// Cargoz patterns
export * from "./patterns/PriceDisplay";
export * from "./patterns/RatingStars";
export * from "./patterns/TrustBadge";
export * from "./patterns/ContactCTA";
export * from "./patterns/ListingCard";
export * from "./patterns/SearchFilterBar";
export * from "./patterns/FilterChip";
export * from "./patterns/StatusPill";
export * from "./patterns/EmptyState";

// Responsive
export { breakpoints, media } from "./tokens/breakpoints";
export type { Breakpoint } from "./tokens/breakpoints";
export { useBreakpoint, useMinWidth } from "./hooks/useBreakpoint";

// Utilities
export { cx } from "./utils/cx";
export type { Space } from "./utils/cx";
