"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  Controller,
  useFieldArray,
  type Control,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import { SelectInput, TextInput } from "@/components/ui";
import { createEmptyPlan } from "@/lib/admin-parks";
import {
  ADMIN_PLAN_NEED_OPTIONS,
  type AdminParkFormValues,
} from "@/types/admin";

interface PlansEditorProps {
  control: Control<AdminParkFormValues>;
  register: UseFormRegister<AdminParkFormValues>;
  errors: FieldErrors<AdminParkFormValues>;
}

export function PlansEditor({ control, register, errors }: PlansEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "plans",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-brand-dark">
            Planes asociados
          </h3>
          <p className="mt-0.5 text-xs text-brand-dark/50">
            Agrega o edita las soluciones memoriales de esta entidad.
          </p>
        </div>
        <button
          type="button"
          onClick={() => append(createEmptyPlan())}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-brand-dark/10 bg-white px-3 text-xs font-medium text-brand-dark transition hover:bg-brand-muted"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar plan
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-3 rounded-2xl border border-brand-dark/10 bg-brand-muted/30 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/45">
              Plan {index + 1}
            </p>
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Quitar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <TextInput
              label="Nombre del plan"
              placeholder="Parcela Familiar 2 Capas"
              error={errors.plans?.[index]?.name?.message}
              {...register(`plans.${index}.name`, {
                required: "Nombre requerido",
              })}
            />
            <Controller
              control={control}
              name={`plans.${index}.needType`}
              render={({ field: needField }) => (
                <SelectInput
                  label="Tipo de necesidad"
                  options={ADMIN_PLAN_NEED_OPTIONS}
                  value={needField.value}
                  onChange={needField.onChange}
                  onBlur={needField.onBlur}
                  name={needField.name}
                />
              )}
            />
            <TextInput
              label="Capacidad"
              placeholder="Hasta 4 sepulturas"
              {...register(`plans.${index}.capacity`)}
            />
            <TextInput
              label="Precio de referencia ($)"
              type="number"
              min={0}
              {...register(`plans.${index}.priceFrom`, {
                valueAsNumber: true,
              })}
            />
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
              Descripción
            </span>
            <textarea
              rows={2}
              className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
              {...register(`plans.${index}.description`)}
            />
          </label>

          <TextInput
            label="Nota de mantención del plan (opcional)"
            placeholder="Ej. Incluye abono anual durante 5 años"
            {...register(`plans.${index}.maintenanceNote`)}
          />
        </div>
      ))}
    </div>
  );
}
