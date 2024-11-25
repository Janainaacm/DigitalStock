import SideBar from "./components/SideBar"

export default function RootLayout({children}) {

    return (
      <section className="h-screen w-full">

        <div className="grid grid-cols-[250px_1fr] h-full">
          <div className="col-span-1">
            <SideBar />
          </div>

          <div className="col-span-1 overflow-auto">{children}</div>
        </div>
      </section>
  );
  }
  