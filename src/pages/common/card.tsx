import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
}

export function CardContent({ children, className, onTap }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`} onClick={onTap}>
      {children}
    </div>
  );
}
