import ManagerNavBar from "../components/managerNavBar"
import { Route, Routes } from "react-router-dom"
import SalesReport from "../components/sales-report"

export const Manager = () => {

    return (
        <>
        <div className="managerPage">
                <h1>Manager Page</h1>
                <ManagerNavBar />
                <Routes>
                    <Route path="sales-report" element={<SalesReport/>} />
                </Routes>
        </div>
        </>
    )
}