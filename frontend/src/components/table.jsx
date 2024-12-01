import React from 'react';
import PropTypes from 'prop-types';
import './table.css';

const ItemTable = ({ columns, rows }) => {
    const formatNumber = (num) => {
        return Number.isInteger(num) ? num : num.toFixed(2);
    };

    const formatValue = (value) => {
        if (Array.isArray(value)) {
            return value.join(', ');
        } else if (typeof value === 'boolean') {
            return value.toString();
        } else if (typeof value === 'number') {
            return formatNumber(value);
        } else {
            return value;
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                                {formatValue(row[column])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

ItemTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemTable;
