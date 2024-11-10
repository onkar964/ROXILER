import React, { useEffect, useState } from 'react';
import { initializeDatabase, fetchTransactions, fetchStatistics, fetchBarChartData} from '../api';
import TransactionTable from './TransactionTable';
import Statistics from './Statistics';
import BarChart from './BarChart';

const App = () => {
    const [month, setMonth] = useState('March');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await initializeDatabase(); // Uncomment to initialize database
                const transactionsData = await fetchTransactions(month);
                const statisticsData = await fetchStatistics(month);
                const barChartDataResponse = await fetchBarChartData(month);

                setTransactions(transactionsData.data.transactions);
                setStatistics(statisticsData.data);
                setBarChartData(barChartDataResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally set error state or show error message
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [month]);

    return (
        <div>
            <h1>Transactions Dashboard</h1>
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <TransactionTable transactions={transactions} />
                    <Statistics 
                        statistics={statistics} 
                        month={month} 
                    />
                    <BarChart data={barChartData} />
                </>
            )}
        </div>
    );
};

export default App;