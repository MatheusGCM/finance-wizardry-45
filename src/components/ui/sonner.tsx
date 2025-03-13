import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-finance-card group-[.toaster]:text-finance-text group-[.toaster]:border-finance-card/50 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-finance-muted",
          actionButton:
            "group-[.toast]:bg-finance-income group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-finance-card/80 group-[.toast]:text-finance-muted",
          success: "group-[.toast]:!bg-finance-income/10 group-[.toast]:!border-finance-income/20",
          error: "group-[.toast]:!bg-finance-expense/10 group-[.toast]:!border-finance-expense/20",
          info: "group-[.toast]:!bg-finance-card group-[.toast]:!border-finance-card/50",
        },
        duration: 4000,
      }}
      {...props}
    />
  )
}

export { Toaster }
