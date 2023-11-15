interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className=" border-t border-slate-300">
      <main className="container flex w-full max-w-[1000px] flex-1 flex-col overflow-hidden pt-4">
        {children}
      </main>
    </div>
  )
}
