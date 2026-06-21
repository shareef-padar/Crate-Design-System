import { useState } from "react";
import { Heart, Lightning, CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { Card } from "../../components/Card";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Badge, type BadgeTone } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Stack } from "../../primitives/Stack";
import { Inline } from "../../primitives/Inline";
import { PriceDisplay, type Currency } from "../PriceDisplay";
import { RatingStars } from "../RatingStars";
import { TrustBadge, type TrustType } from "../TrustBadge";
import { ContactCTA } from "../ContactCTA";
import styles from "./ListingCard.module.css";

export type ListingLayout = "stack" | "row";

export interface MoveIn {
  /** e.g. "24hr move-in" or "3-5 day move-in". */
  label: string;
  /** "fast" = teal/lightning, "standard" = purple/calendar. */
  speed?: "fast" | "standard";
}

export interface ListingCardProps {
  title: string;
  location?: string;
  /** e.g. "Dry storage · 2,500 sqft". */
  details?: string;
  /** Single image. Use `images` for a gallery with prev/next arrows. */
  image?: string;
  /** Multiple images — shows carousel arrows when more than one. */
  images?: string[];
  imageAlt?: string;
  price: { amount: number; currency?: Currency; unit?: string; period?: string };
  /** Secondary total line, e.g. "AED 357 for 1 month". */
  total?: string;
  /** Availability badge on the image. */
  status?: { label: string; tone?: BadgeTone };
  /** Move-in speed badge (top-start of the image). */
  moveIn?: MoveIn;
  /** Short informational tags, e.g. ["AC", "Pallet Storage", "1,200 sqft"]. */
  features?: string[];
  rating?: { value: number; count?: number; countLabel?: string };
  trust?: TrustType[];
  /** Favorite (heart) toggle on the image. */
  favorite?: boolean;
  onFavoriteToggle?: () => void;
  /** Primary action. */
  onView?: () => void;
  viewLabel?: string;
  /** Secondary "Compare" action. */
  onCompare?: () => void;
  compareLabel?: string;
  /** Contact details — shows the phone + WhatsApp CTA when provided. */
  phone?: string;
  whatsapp?: string;
  /** "stack" (default) is a vertical grid card; "row" is a horizontal list row. */
  layout?: ListingLayout;
  className?: string;
}

/** The Cargoz warehouse listing — one consistent structure, with trust signals built in.
 *  `layout="row"` is the horizontal search-results row; `layout="stack"` is the grid card. */
export function ListingCard({
  title,
  location,
  details,
  image,
  images,
  imageAlt = "",
  price,
  total,
  status,
  moveIn,
  features,
  rating,
  trust,
  favorite,
  onFavoriteToggle,
  onView,
  viewLabel = "View",
  onCompare,
  compareLabel = "Compare",
  phone,
  whatsapp,
  layout = "stack",
  className,
}: ListingCardProps) {
  const gallery = images && images.length > 0 ? images : image ? [image] : [];
  const [index, setIndex] = useState(0);
  const hasCarousel = gallery.length > 1;
  const current = gallery[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + gallery.length) % gallery.length);

  const media = (
    <div className={cx(styles.media, layout === "row" && styles.mediaRow)}>
      {current ? (
        <img src={current} alt={imageAlt} className={styles.image} />
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}

      {moveIn && (
        <span
          className={cx(
            styles.moveIn,
            moveIn.speed === "standard" ? styles.moveInStandard : styles.moveInFast,
          )}
        >
          {moveIn.speed === "standard" ? <CalendarBlank weight="fill" /> : <Lightning weight="fill" />}
          {moveIn.label}
        </span>
      )}

      {onFavoriteToggle && (
        <button
          type="button"
          className={styles.favorite}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from saved" : "Save listing"}
          onClick={onFavoriteToggle}
        >
          <Heart weight={favorite ? "fill" : "regular"} />
        </button>
      )}

      {status && (
        <span className={styles.statusSlot}>
          <Badge tone={status.tone ?? "success"} dot>
            {status.label}
          </Badge>
        </span>
      )}

      {hasCarousel && (
        <>
          <button
            type="button"
            className={cx(styles.navArrow, styles.navPrev)}
            aria-label="Previous image"
            onClick={() => go(-1)}
          >
            <CaretLeft weight="bold" />
          </button>
          <button
            type="button"
            className={cx(styles.navArrow, styles.navNext)}
            aria-label="Next image"
            onClick={() => go(1)}
          >
            <CaretRight weight="bold" />
          </button>
        </>
      )}
    </div>
  );

  const featureChips = features && features.length > 0 && (
    <Inline gap={2} wrap>
      {features.map((f) => (
        <span key={f} className={styles.featureChip}>
          {f}
        </span>
      ))}
    </Inline>
  );

  const ratingEl = rating && (
    <RatingStars
      value={rating.value}
      count={rating.count}
      countLabel={rating.countLabel}
      variant={layout === "row" ? "compact" : "full"}
      size="sm"
    />
  );

  if (layout === "row") {
    return (
      <Card padding={0} className={cx(styles.card, styles.rowCard, className)}>
        {media}

        <div className={styles.rowBody}>
          <Stack gap={3} className={styles.rowMain}>
            <Heading level={3} size="h4">
              {title}
            </Heading>
            {ratingEl}
            {featureChips}
            {(location || details) && (
              <Text size="body-sm" color="secondary">
                {[location, details].filter(Boolean).join(" · ")}
              </Text>
            )}
            {trust && trust.length > 0 && (
              <Inline gap={2}>
                {trust.map((t) => (
                  <TrustBadge key={t} type={t} />
                ))}
              </Inline>
            )}
          </Stack>

          <div className={styles.rowAside}>
            <Stack gap={2} className={styles.priceBlock}>
              <PriceDisplay
                amount={price.amount}
                currency={price.currency}
                unit={price.unit}
                period={price.period}
                size="lg"
                stacked
                align="end"
              />
              {total && (
                <Text size="body-sm" color="secondary">
                  {total}
                </Text>
              )}
            </Stack>

            <Inline gap={3} className={styles.rowActions}>
              {onCompare && (
                <Button variant="secondary" onClick={onCompare}>
                  {compareLabel}
                </Button>
              )}
              {onView && <Button onClick={onView}>{viewLabel}</Button>}
            </Inline>
          </div>
        </div>
      </Card>
    );
  }

  // Stack (grid card) layout — the default.
  return (
    <Card padding={0} className={cx(styles.card, className)}>
      {media}

      <Stack gap={3} className={styles.body}>
        <Stack gap={1}>
          <Heading level={3} size="h4">
            {title}
          </Heading>
          {(location || details) && (
            <Text size="body-sm" color="secondary">
              {[location, details].filter(Boolean).join(" · ")}
            </Text>
          )}
        </Stack>

        {trust && trust.length > 0 && (
          <Inline gap={2}>
            {trust.map((t) => (
              <TrustBadge key={t} type={t} />
            ))}
          </Inline>
        )}

        {ratingEl}
        {featureChips}

        <PriceDisplay
          amount={price.amount}
          currency={price.currency}
          unit={price.unit}
          period={price.period}
        />
        {total && (
          <Text size="body-sm" color="secondary">
            {total}
          </Text>
        )}

        {(onCompare || onView) && (
          <Inline gap={3}>
            {onCompare && (
              <Button variant="secondary" fullWidth onClick={onCompare}>
                {compareLabel}
              </Button>
            )}
            {onView && (
              <Button fullWidth onClick={onView}>
                {viewLabel}
              </Button>
            )}
          </Inline>
        )}
        {phone && <ContactCTA phone={phone} whatsapp={whatsapp} />}
      </Stack>
    </Card>
  );
}
