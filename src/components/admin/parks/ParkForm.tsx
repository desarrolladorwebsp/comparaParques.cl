"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { Button, SelectInput, TextInput } from "@/components/ui";
import { FeatureTagsInput } from "@/components/admin/parks/FeatureTagsInput";
import { PlansEditor } from "@/components/admin/parks/PlansEditor";
import { useAdminParks } from "@/context/AdminParksContext";
import { formValuesToAdminPark } from "@/lib/admin-parks";
import { cn } from "@/lib/cn";
import {
  ADMIN_STATUS_OPTIONS,
  type AdminPark,
  type AdminParkFormValues,
} from "@/types/admin";
import { CEMETERY_TYPES } from "@/types/cemetery";

const TABS = [
  { id: "general", label: "Datos generales" },
  { id: "multimedia", label: "Multimedia" },
  { id: "features", label: "Características" },
  { id: "planes", label: "Planes y mantención" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface ParkFormProps {
  mode: "create" | "edit";
  initialValues: AdminParkFormValues;
  existing?: AdminPark;
}

export function ParkForm({ mode, initialValues, existing }: ParkFormProps) {
  const router = useRouter();
  const { upsertPark } = useAdminParks();
  const [tab, setTab] = useState<TabId>("general");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminParkFormValues>({
    defaultValues: initialValues,
  });

  const gallery = watch("gallery");

  const onSubmit: SubmitHandler<AdminParkFormValues> = async (values) => {
    if (!values.type) return;
    try {
      const park = formValuesToAdminPark(values, existing);
      await upsertPark(park, { create: mode === "create" });
      setSavedMsg(
        mode === "create"
          ? "Parque creado correctamente en la base de datos."
          : "Cambios guardados correctamente en la base de datos.",
      );
      window.setTimeout(() => {
        router.push("/admin/parques");
      }, 600);
    } catch {
      setSavedMsg("No se pudo guardar. Revisa la conexión a la base de datos.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-brand-dark/10 bg-white p-2 shadow-soft">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-xl px-3.5 py-2 text-sm font-medium transition",
              tab === item.id
                ? "bg-brand-dark text-white"
                : "text-brand-dark/65 hover:bg-brand-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {savedMsg ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {savedMsg}
        </div>
      ) : null}

      <div className="rounded-3xl border border-brand-dark/10 bg-white p-5 shadow-soft sm:p-6">
        {tab === "general" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextInput
                label="Nombre del parque / entidad"
                placeholder="Parque del Recuerdo"
                error={errors.name?.message}
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              <Controller
                control={control}
                name="type"
                rules={{ required: "Selecciona un tipo" }}
                render={({ field }) => (
                  <SelectInput
                    label="Tipo de entidad"
                    options={CEMETERY_TYPES.map((type) => ({
                      value: type,
                      label: type,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    error={errors.type?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <SelectInput
                    label="Estado"
                    options={ADMIN_STATUS_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                )}
              />
              <TextInput
                label="Región"
                placeholder="RM"
                {...register("region", { required: "Región requerida" })}
                error={errors.region?.message}
              />
              <TextInput
                label="Comuna"
                placeholder="Huechuraba"
                {...register("commune", { required: "Comuna requerida" })}
                error={errors.commune?.message}
              />
              <TextInput
                label="Dirección exacta"
                placeholder="Av. El Salto 5000"
                {...register("address", { required: "Dirección requerida" })}
                error={errors.address?.message}
              />
              <TextInput
                label="Latitud"
                placeholder="-33.3721"
                {...register("lat", { required: "Latitud requerida" })}
                error={errors.lat?.message}
              />
              <TextInput
                label="Longitud"
                placeholder="-70.6478"
                {...register("lng", { required: "Longitud requerida" })}
                error={errors.lng?.message}
              />
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                Descripción cálida e institucional
              </span>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                placeholder="Describe el entorno, la tradición y lo que hace especial a este lugar..."
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
              />
              {errors.description ? (
                <span className="text-xs text-red-600">
                  {errors.description.message}
                </span>
              ) : null}
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                  Vías de acceso
                </span>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  {...register("accessNotes")}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                  Transporte público cercano
                </span>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  {...register("transitNotes")}
                />
              </label>
            </div>
          </div>
        ) : null}

        {tab === "multimedia" ? (
          <div className="space-y-4">
            <TextInput
              label="Logo del parque (URL)"
              hint="Por ahora usamos URL. El upload nativo se conectará en una fase siguiente."
              placeholder="/logos/parque-recuerdo.svg o https://..."
              {...register("logoUrl")}
            />
            <TextInput
              label="Imagen principal / Hero (URL)"
              placeholder="https://images.unsplash.com/..."
              {...register("mainImage", {
                required: "La imagen principal es obligatoria",
              })}
              error={errors.mainImage?.message}
            />
            <TextInput
              label="Video promocional (YouTube / Vimeo embed)"
              placeholder="https://www.youtube.com/embed/..."
              {...register("videoUrl")}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                    Galería de fotos (URLs)
                  </p>
                  <p className="mt-0.5 text-xs text-brand-dark/45">
                    Una URL por campo. Puedes agregar más imágenes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setValue("gallery", [...gallery, ""])}
                  className="rounded-xl border border-brand-dark/10 px-3 py-2 text-xs font-medium text-brand-dark hover:bg-brand-muted"
                >
                  + Imagen
                </button>
              </div>
              {gallery.map((_, index) => (
                <div key={`gallery-${index}`} className="flex gap-2">
                  <TextInput
                    label={`Imagen ${index + 1}`}
                    wrapperClassName="flex-1"
                    placeholder="https://..."
                    {...register(`gallery.${index}` as const)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "gallery",
                        gallery.filter((_, i) => i !== index),
                      )
                    }
                    className="mt-6 h-12 shrink-0 rounded-xl px-3 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "features" ? (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-brand-dark">
                Características y beneficios
              </h3>
              <p className="mt-1 text-sm text-brand-dark/55">
                Selecciona sugerencias o agrega beneficios personalizados.
              </p>
            </div>
            <Controller
              control={control}
              name="features"
              render={({ field }) => (
                <FeatureTagsInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        ) : null}

        {tab === "planes" ? (
          <div className="space-y-8">
            <PlansEditor
              control={control}
              register={register}
              errors={errors}
            />

            <div className="space-y-4 border-t border-brand-dark/8 pt-6">
              <div>
                <h3 className="text-sm font-semibold text-brand-dark">
                  Transparencia de mantenciones
                </h3>
                <p className="mt-1 text-sm text-brand-dark/55">
                  Información clara, sin letra chica, para las familias.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  control={control}
                  name="maintenanceType"
                  render={({ field }) => (
                    <SelectInput
                      label="Tipo de mantención"
                      options={[
                        { value: "Anual", label: "Anual" },
                        { value: "Perpetua", label: "Perpetua" },
                        { value: "Mixta", label: "Mixta" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  )}
                />
                <TextInput
                  label="Estimación anual ($)"
                  type="number"
                  min={0}
                  placeholder="120000"
                  {...register("maintenanceAnnualEstimate")}
                />
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                  Resumen de mantención
                </span>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  {...register("maintenanceSummary")}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                  Qué incluye (una línea por ítem)
                </span>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  placeholder={"Riego y jardinería\nSeguridad\nMantención de caminos"}
                  {...register("maintenanceIncludes")}
                />
              </label>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/parques")}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {mode === "create" ? "Crear parque" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
