
import { DashboardLayout } from "@/components/dashboard-layout"
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <DashboardLayout>{children}</DashboardLayout>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
