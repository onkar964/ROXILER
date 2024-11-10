import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const initializeDatabase = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/initialize`);
        return response;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};

export const fetchTransactions = async (month, page = 1, perPage = 10, search = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions`, {
            params: { month, page, perPage, search }
        });
        return response;
    } catch (error) {
        console.error('Fetch transactions error:', error);
        throw error;
    }
};

export const fetchStatistics = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/statistics`, {
            params: { month }
        });
        return response;
    } catch (error) {
        console.error('Fetch statistics error:', error);
        throw error;
    }
};

export const fetchBarChartData = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bar-chart`, {
            params: { month }
        });
        return response;
    } catch (error) {
        console.error('Fetch bar chart data error:', error);
        throw error;
    }
};

export const fetchPieChartData = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pie-chart`, {
            params: { month }
        });
        return response;
    } catch (error) {
        console.error('Fetch pie chart data error:', error);
        throw error;
    }
};