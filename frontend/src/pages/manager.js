import ManagerNavBar from "../components/managerNavBar"
import { Route, Routes } from "react-router-dom"
import SalesReport from "../components/sales-report"
import StaffTable from "../components/staffTable"
import RestockTable from "../components/restock-table"
import OrderHistoryTable from "../components/orderHistoryTable"
import XReport from "../components/x-report"
import ZReport from "../components/z-report"

export const Manager = () => {

    return (
        <>
        <div className="managerPage">
                <h1>Manager Page</h1>
                <ManagerNavBar />
                <Routes>
                    <Route path="sales-report" element={<SalesReport/>} />
                    <Route path="staff-table" element={<StaffTable/>}/>
                    <Route path="restock-report" element={<RestockTable/>}/>
                    <Route path="order-history-table" element={<OrderHistoryTable/>}/>
                    <Route path="x-report" element={<XReport/>} />
                    <Route path="z-report" element={<ZReport/>}></Route>
                </Routes>
        </div>
        </>
    )
}