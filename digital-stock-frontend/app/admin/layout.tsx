import SideBar from "./components/SideBar";
import AdminBanner from "./components/AdminBanner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section className="h-screen w-full">
        <AdminBanner />

        <div className="grid grid-cols-[250px_1fr] h-full">
          <div className="col-span-1">
            <SideBar />
          </div>

          <div className="col-span-1 overflow-auto">{children}</div>
        </div>
      </section>
  );
}
