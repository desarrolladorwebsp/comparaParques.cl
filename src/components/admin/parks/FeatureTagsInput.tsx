"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { ADMIN_FEATURE_SUGGESTIONS } from "@/types/admin";
import { cn } from "@/lib/cn";

interface FeatureTagsInputProps {
  value: string[];
  onChange: (features: string[]) => void;
  error?: string;
}

export function FeatureTagsInput({
  value,
  onChange,
  error,
}: FeatureTagsInputProps) {
  const [draft, setDraft] = useState("");

  function addFeature(raw: string) {
    const feature = raw.trim();
    if (!feature) return;
    if (value.some((item) => item.toLowerCase() === feature.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, feature]);
    setDraft("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((feature) => (
          <span
            key={feature}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark/8 px-3 py-1.5 text-xs font-medium text-brand-dark"
          >
            {feature}
            <button
              type="button"
              onClick={() => onChange(value.filter((item) => item !== feature))}
              className="rounded-full p-0.5 text-brand-dark/45 transition hover:bg-brand-dark/10 hover:text-brand-dark"
              aria-label={`Quitar ${feature}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {value.length === 0 ? (
          <p className="text-sm text-brand-dark/45">
            Aún no hay beneficios agregados.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFeature(draft);
            }
          }}
          placeholder="Escribe un beneficio y Enter"
          className={cn(
            "h-11 flex-1 rounded-xl border bg-white px-3.5 text-sm outline-none transition",
            "border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
          )}
        />
        <button
          type="button"
          onClick={() => addFeature(draft)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 text-sm font-medium text-white transition hover:bg-[#162a1f]"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ADMIN_FEATURE_SUGGESTIONS.map((suggestion) => {
          const selected = value.includes(suggestion);
          return (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                if (selected) {
                  onChange(value.filter((item) => item !== suggestion));
                } else {
                  onChange([...value, suggestion]);
                }
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                selected
                  ? "border-brand-orange bg-orange-50 text-brand-orange"
                  : "border-brand-dark/10 bg-white text-brand-dark/70 hover:border-brand-dark/20",
              )}
            >
              {suggestion}
            </button>
          );
        })}
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
