import KitchenItems from "../components/kitchenPage"
/**
 * @module Kitchen
 * @description Displays the kitchen interface, showing queued orders to kitchen staff. 
 * Integrates the KitchenItems component.
 * 
 * @returns {JSX.Element} The kitchen page layout with order details.
 */
export const Kitchen = () => {

    return (
        <>
        <div className="KitchenPage">
            <KitchenItems/>
        </div>
        </>
    )
}