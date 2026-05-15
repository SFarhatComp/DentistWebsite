import { cn } from "@/lib/utils"

// Base styles. `[&:user-invalid]:border-red-500` triggers AFTER the user
// has interacted with the field (vs `:invalid` which fires immediately on
// page load for empty required fields).
const inputClass = "w-full border bg-background px-4 py-3 text-base focus:outline-none transition-colors [&:user-invalid]:border-red-500 [&:user-invalid]:bg-red-50/30"
const inputClassNormal = "border-border focus:border-primary"
const inputClassError = "border-red-500 focus:border-red-600 bg-red-50/30"
const labelClass = "label-sm text-foreground block mb-2"

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm text-red-600" role="alert">
      {message}
    </p>
  )
}

export function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  defaultValue,
  className,
  error,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  className?: string
  error?: string
}) {
  const errorId = `${name}-error`
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error ? inputClassError : inputClassNormal)}
      />
      <ErrorMessage id={errorId} message={error} />
    </div>
  )
}

export function TextareaField({
  name,
  label,
  required,
  placeholder,
  rows = 4,
  className,
  error,
}: {
  name: string
  label: string
  required?: boolean
  placeholder?: string
  rows?: number
  className?: string
  error?: string
}) {
  const errorId = `${name}-error`
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && " *"}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error ? inputClassError : inputClassNormal)}
      />
      <ErrorMessage id={errorId} message={error} />
    </div>
  )
}

export function SelectField({
  name,
  label,
  options,
  required,
  defaultValue,
  className,
  onChange,
  error,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  required?: boolean
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
  error?: string
}) {
  const errorId = `${name}-error`
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && " *"}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue || ""}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error ? inputClassError : inputClassNormal)}
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorMessage id={errorId} message={error} />
    </div>
  )
}

export function CheckboxField({
  name,
  value,
  label,
  required,
  defaultChecked,
  className,
  error,
}: {
  name: string
  value?: string
  label: React.ReactNode
  required?: boolean
  defaultChecked?: boolean
  className?: string
  error?: string
}) {
  const errorId = `${name}-error`
  return (
    <div className={className}>
      <label
        className={cn(
          "flex items-start gap-3 cursor-pointer text-sm leading-relaxed text-foreground",
          error && "ring-2 ring-red-500 ring-offset-2 ring-offset-background -m-1 p-1 rounded-sm",
        )}
      >
        <input
          type="checkbox"
          name={name}
          value={value}
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-4 w-4 border-border accent-primary"
        />
        <span>{label}</span>
      </label>
      <ErrorMessage id={errorId} message={error} />
    </div>
  )
}

export function RadioField({
  name,
  value,
  label,
  required,
  defaultChecked,
  className,
}: {
  name: string
  value: string
  label: string
  required?: boolean
  defaultChecked?: boolean
  className?: string
}) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer text-sm text-foreground", className)}>
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        defaultChecked={defaultChecked}
        className="h-4 w-4 border-border accent-primary"
      />
      <span>{label}</span>
    </label>
  )
}

export function FileField({
  name,
  label,
  accept,
  multiple,
  helpText,
  className,
}: {
  name: string
  label: string
  accept?: string
  multiple?: boolean
  helpText?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer hover:file:bg-primary-hover"
      />
      {helpText && <p className="mt-2 text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
}

export function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t-2 border-primary/20 pt-10">
      <legend className="float-none mb-8">
        <div className="label-sm text-accent mb-2">{number}</div>
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </legend>
      <div className="space-y-6">{children}</div>
    </fieldset>
  )
}

export function HoneypotField() {
  return (
    <p hidden aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
      <label>
        Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  )
}

/**
 * Summary of validation errors shown at the top of a form.
 * Pass an object like { fieldName: "Veuillez inscrire votre nom" }.
 */
export function FormErrorSummary({ errors }: { errors: Record<string, string> }) {
  const entries = Object.entries(errors).filter(([, msg]) => Boolean(msg))
  if (entries.length === 0) return null
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="border-2 border-red-500 bg-red-50/50 p-5 md:p-6"
    >
      <h3 className="font-display text-base text-red-700 mb-3">
        Veuillez corriger les éléments suivants :
      </h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
        {entries.map(([name, msg]) => (
          <li key={name}>
            <a href={`#${name}`} className="underline hover:no-underline">
              {msg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
