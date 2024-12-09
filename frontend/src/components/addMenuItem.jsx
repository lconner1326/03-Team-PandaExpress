import { useState } from "react";


function AddMenuItem(){
    
    const [showForm, setShowForm] = useState(false);
    
    const [item_name, setItem_name] = useState('');

    const [category, setCategory] = useState('');

    const [premium, setPremium] = useState('');

    const [ingredientsused, setIngredientsused] = useState([]);

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
        fetch('https://project-3-03-team-2xy5.onrender.com/api/addMenuItemData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_name,
                category,
                premium,
                ingredientsused: [],
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
            <button className="manager-nav-bar-button" onClick={handleButtonClick}>Add Menu Item</button>
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
                        <label className="form-label">
                            Category:
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Side">Side</option>
                                <option value="Entree">Entree</option>
                            </select>
                        </label>
                        <label className="form-label">
                            Premium:
                            <select
                                value={premium}
                                onChange={(e) => setPremium(e.target.value)}
                            >
                                <option value="">Select Premium</option>
                                <option value="0">0</option>
                                <option value="1.5">1.5</option>
                            </select>
                        </label>
                        <label>
                            Ingredients Used:
                            <input
                                type="text"
                                value={ingredientsused}
                                onChange={(e) => setIngredientsused(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="manager-nav-bar-button" id="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddMenuItem;