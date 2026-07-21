import type {
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type BadgeVariant = "soft" | "solid" | "outline";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  withDot?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  error?: string;
}

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  className?: string;
  wrapperClassName?: string;
}

export type CardVariant = "light" | "muted" | "white" | "highlighted";
export type CardPadding = "sm" | "md" | "lg";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  as?: "div" | "article" | "section";
}

export interface IconFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  wrapperClassName?: string;
}

export interface RadioCardOption {
  value: string;
  title: string;
  description?: string;
}

export interface RadioCardGroupProps {
  label: string;
  name: string;
  options: RadioCardOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export interface FormStepItem {
  id: number;
  label: string;
}

export interface FormStepperProps {
  steps: FormStepItem[];
  currentStep: number;
  className?: string;
}

