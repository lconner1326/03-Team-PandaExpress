import ManagerNavBar from "../components/managerNavBar"
import { Route, Routes } from "react-router-dom"
import SalesReport from "../components/sales-report"
import StaffTable from "../components/staffTable"
import RestockTable from "../components/restock-table"
import OrderHistoryTable from "../components/orderHistoryTable"
import XReport from "../components/x-report"
import ZReport from "../components/z-report"
import MenuItemsTable from "../components/MenuItemsTable"
import BackButton from "../components/backButton"
import PricedItemsTable from "../components/pricedItemsTable"
import IngredientsTable from "../components/ingredientsTable"
import ProductUsage from "../components/product-usage"
/**
 * @module Manager
 * @description Displays the manager dashboard with links to various reports and tables. 
 * Integrates navigation and dynamic routes for managerial tasks.
 * 
 * @returns {JSX.Element} The manager page layout with navigation and content routes.
 */
export const Manager = () => {

    return (
        <>
        <div className="managerPage">
        <BackButton />
                <h1>Manager Page</h1>
                <ManagerNavBar />
                <Routes>
                    <Route path="sales-report" element={<SalesReport/>} />
                    <Route path="staff-table" element={<StaffTable/>}/>
                    <Route path="restock-report" element={<RestockTable/>}/>
                    <Route path="order-history-table" element={<OrderHistoryTable/>}/>
                    <Route path="x-report" element={<XReport/>} />
                    <Route path="z-report" element={<ZReport/>}></Route>
                    <Route path="menuitems-table" element={<MenuItemsTable/>}/>
                    <Route path="priceditems-table" element={<PricedItemsTable/>} />
                    <Route path="ingredients-table" element={<IngredientsTable/>} />
                    <Route path="product-usage" element={<ProductUsage/>} />
                </Routes>
        </div>
        </>
    )
}