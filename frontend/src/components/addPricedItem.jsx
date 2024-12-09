import { useState } from "react";


function AddPricedItem(){
    
    const [showForm, setShowForm] = useState(false);
    
    const [item_name, setItem_name] = useState('');

    const [category, setCategory] = useState('');

    const [price, setPrice] = useState('');

    const handleButtonClick = () => {
        setShowForm(true);
    };
  /**
   * Handles form submission.
   * Prevents default form behavior, sends staff data to the backend API, and
   * hides the form after successful submission.
   *
   * @param {Object} e - The form submission event.
   */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        fetch('https://project-3-03-team-2xy5.onrender.com/api/addPricedItemData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_name,
                category,
                price,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setShowForm(false);
    };

    return (
        <div>
            <button  className="manager-nav-bar-button" onClick={handleButtonClick}>Add Priced Item</button>
            {showForm && (
                <div className="form">
                    <form onSubmit={handleFormSubmit} className="employee-form">
                        <label>
                            Item Name:
                            <input
                                type="text"
                                value={item_name}
                                onChange={(e) => setItem_name(e.target.value)}
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="manager-nav-bar-button" id="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddPricedItem;