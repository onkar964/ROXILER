import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.range),
        datasets: [{
            label: 'Number of Items',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Price Range Distribution'
            }
        }
    };

    return (
        <div>
            <h2>Bar Chart</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;