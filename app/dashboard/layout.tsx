
import DashboardLayoutCmp from "@/components/layouts/dashboard/Layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutCmp>
        {children}
    </DashboardLayoutCmp>
  );
}
