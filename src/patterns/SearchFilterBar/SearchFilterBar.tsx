import { type FormEvent } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import styles from "./SearchFilterBar.module.css";

export interface SearchValues {
  location: string;
  type: string;
  size: string;
  term: string;
}

export interface SearchFilterBarProps {
  onSearch?: (values: SearchValues) => void;
  defaultValues?: Partial<SearchValues>;
  className?: string;
}

const SearchIcon = <MagnifyingGlass aria-hidden />;

/** Cargoz warehouse search — plain-language fields, responsive, pairs with ListingCard. */
export function SearchFilterBar({
  onSearch,
  defaultValues = {},
  className,
}: SearchFilterBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSearch?.({
      location: String(data.get("location") ?? ""),
      type: String(data.get("type") ?? ""),
      size: String(data.get("size") ?? ""),
      term: String(data.get("term") ?? ""),
    });
  };

  return (
    <form
      className={cx(styles.bar, className)}
      role="search"
      aria-label="Search warehouses"
      onSubmit={handleSubmit}
    >
      <FormField label="Where do you need storage?">
        <Input name="location" placeholder="e.g. Dubai, Al Quoz" defaultValue={defaultValues.location} />
      </FormField>
      <FormField label="What are you storing?">
        <Select name="type" defaultValue={defaultValues.type ?? ""}>
          <option value="">Any type</option>
          <option value="dry">General / dry goods</option>
          <option value="food">Food-grade</option>
          <option value="cold">Cold storage</option>
          <option value="chemical">Chemical / pharma</option>
        </Select>
      </FormField>
      <FormField label="Space needed">
        <Select name="size" defaultValue={defaultValues.size ?? ""}>
          <option value="">Any size</option>
          <option value="s">Up to 1,000 sqft</option>
          <option value="m">1,000–5,000 sqft</option>
          <option value="l">5,000+ sqft</option>
        </Select>
      </FormField>
      <FormField label="Rental term">
        <Select name="term" defaultValue={defaultValues.term ?? ""}>
          <option value="">Any term</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </FormField>
      <div className={styles.submit}>
        <Button type="submit" fullWidth leadingIcon={SearchIcon}>
          Search
        </Button>
      </div>
    </form>
  );
}
