import { cn } from "@/lib/utils"

const inputClass = "w-full border border-border bg-background px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
const labelClass = "label-sm text-foreground block mb-2"

export function Field({ name, label, type = "text", required, placeholder, defaultValue, className }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}{required && " *"}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} className={inputClass} />
    </div>
  )
}

export function TextareaField({ name, label, required, placeholder, rows = 4, className }: { name: string; label: string; required?: boolean; placeholder?: string; rows?: number; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}{required && " *"}</label>
      <textarea id={name} name={name} required={required} placeholder={placeholder} rows={rows} className={inputClass} />
    </div>
  )
}

export function SelectField({ name, label, options, required, defaultValue, className }: { name: string; label: string; options: { value: string; label: string }[]; required?: boolean; defaultValue?: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}{required && " *"}</label>
      <select id={name} name={name} required={required} defaultValue={defaultValue || ""} className={inputClass}>
        <option value="">—</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export function CheckboxField({ name, value, label, required, className }: { name: string; value?: string; label: string; required?: boolean; className?: string }) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer text-sm leading-relaxed text-foreground", className)}>
      <input type="checkbox" name={name} value={value} required={required} className="mt-1 h-4 w-4 border-border accent-primary" />
      <span>{label}</span>
    </label>
  )
}

export function RadioField({ name, value, label, required, defaultChecked, className }: { name: string; value: string; label: string; required?: boolean; defaultChecked?: boolean; className?: string }) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer text-sm text-foreground", className)}>
      <input type="radio" name={name} value={value} required={required} defaultChecked={defaultChecked} className="h-4 w-4 border-border accent-primary" />
      <span>{label}</span>
    </label>
  )
}

export function FileField({ name, label, accept, multiple, helpText, className }: { name: string; label: string; accept?: string; multiple?: boolean; helpText?: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input id={name} name={name} type="file" accept={accept} multiple={multiple} className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer hover:file:bg-primary-hover" />
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
    <p className="hidden">
      <label>Don&apos;t fill this out: <input name="bot-field" /></label>
    </p>
  )
}
