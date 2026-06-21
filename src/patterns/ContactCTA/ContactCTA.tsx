import { Phone, WhatsappLogo } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./ContactCTA.module.css";

export interface ContactCTAProps {
  /** Phone number, e.g. "+971 50 123 4567". Used for the tel: link and (optionally) the label. */
  phone: string;
  /** WhatsApp number (digits, with country code). Omit to hide the WhatsApp button. */
  whatsapp?: string;
  /** Stack vertically instead of side by side. */
  layout?: "row" | "stack";
  /** Show the actual phone number on the call button instead of "Call now". */
  showNumber?: boolean;
  className?: string;
}

/** Phone + WhatsApp actions — always visible, always text-labeled, large touch targets. */
export function ContactCTA({
  phone,
  whatsapp,
  layout = "row",
  showNumber = false,
  className,
}: ContactCTAProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : undefined;

  return (
    <nav
      className={cx(styles.cta, layout === "stack" && styles.stack, className)}
      aria-label="Contact options"
    >
      <a className={cx(styles.action, styles.call)} href={telHref}>
        <span className={styles.icon}>
          <Phone weight="fill" />
        </span>
        {showNumber ? phone : "Call now"}
      </a>
      {waHref && (
        <a
          className={cx(styles.action, styles.whatsapp)}
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.icon}>
            <WhatsappLogo weight="fill" />
          </span>
          WhatsApp
        </a>
      )}
    </nav>
  );
}
