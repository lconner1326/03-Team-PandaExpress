import ManagerNavBar from "../components/managerNavBar"
import { Route, Routes } from "react-router-dom"
import SalesReport from "../components/sales-report"
import StaffTable from "../components/staffTable"

export const Manager = () => {

    return (
        <>
        <div className="managerPage">
                <h1>Manager Page</h1>
                <ManagerNavBar />
                <Routes>
                    <Route path="sales-report" element={<SalesReport/>} />
                    <Route path="staff-table" element={<StaffTable/>}/>
                </Routes>
        </div>
        </>
    )
}