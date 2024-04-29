import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Sidebar } from "@/components/Sidebar"

import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/index.css"

export const AppLayout = () => (
  <div className="container m-0 p-0 h-100 mw-100">
    <div className="row m-0 h-100 mh-100">
      <aside className="col-4 col-lg-3 pt-5 pb-2 px-0 mh-100">
        <Sidebar />
      </aside>
      <main className="col-8 col-xl-6 pt-5 pb-2 mh-100">
        <Outlet />
      </main>
    </div>
    <ToastContainer autoClose={5000} />
  </div>
)
