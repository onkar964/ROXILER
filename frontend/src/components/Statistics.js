import React from 'react';

const Statistics = ({ statistics, month }) => {
    // Provide default values to prevent undefined errors
    const {
        totalSaleAmount = 0,
        totalSoldItems = 0,
        totalUnsoldItems = 0
    } = statistics || {};

    return (
        <div className="statistics-container">
            <h2>Statistics - {month}</h2>
            <div className="statistic-item">
                <label>Total Sale Amount:</label>
                <span>${totalSaleAmount.toFixed(2)}</span>
            </div>
            <div className="statistic-item">
                <label>Total Sold Items:</label>
                <span>{totalSoldItems}</span>
            </div>
            <div className="statistic-item">
                <label>Total Unsold Items:</label>
                <span>{totalUnsoldItems}</span>
            </div>
        </div>
    );
};

export default Statistics;