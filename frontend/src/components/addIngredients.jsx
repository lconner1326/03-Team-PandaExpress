import { useState } from "react";


function AddIngredient(){
    
    const [showForm, setShowForm] = useState(false);
    
    const [ingredient_name, setIngredient_name] = useState('');

    const [units, setUnits] = useState('');

    const [restock_level, setRestock_level] = useState('');

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
        fetch('https://project-3-03-team-2xy5.onrender.com/api/addIngredientData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredient_name,
                units,
                restock_level,
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
            <button  className="manager-nav-bar-button" onClick={handleButtonClick}>Add Ingredients</button>
            {showForm && (
                <div className="form">
                    <form onSubmit={handleFormSubmit} className="employee-form">
                        <label>
                            Ingredient Name:
                            <input
                                type="text"
                                value={ingredient_name}
                                onChange={(e) => setIngredient_name(e.target.value)}
                            />
                        </label>
                        <label>
                            Units:
                            <input
                                type="text"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                        </label>
                        <label>
                            Restock Level:
                            <input
                                type="text"
                                value={restock_level}
                                onChange={(e) => setRestock_level(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="manager-nav-bar-button" id="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddIngredient;