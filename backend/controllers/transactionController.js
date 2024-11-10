const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize database with seed data
const initializeDatabase = async (req, res) => {
    try {
        // Fetch data from the provided URL
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data.map(transaction => ({
            ...transaction,
            dateOfSale: new Date(transaction.dateOfSale)
        }));

        // Clear existing data and insert new data
        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).json({ 
            message: 'Database initialized successfully', 
            count: transactions.length 
        });
    } catch (error) {
        console.error('Database initialization error:', error);
        res.status(500).json({ 
            error: 'Failed to initialize database',
            details: error.message 
        });
    }
};

// Get transactions with advanced filtering and pagination
const getTransactions = async (req, res) => {
    try {
        const { 
            month = '', 
            page = 1, 
            perPage = 10, 
            search = '' 
        } = req.query;

        // Month mapping
        const monthMapping = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        };

        // Convert month name to number
        const monthNumber = monthMapping[month] || new Date().getMonth() + 1;

        // Construct query for filtering
        const query = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber]
            },
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 
                    price: search ? 
                    { $regex: new RegExp(search, 'i') } : 
                    { $exists: true } 
                }
            ]
        };

        // Perform pagination and filtering
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage))
            .select('-__v');

        const total = await Transaction.countDocuments(query);

        res.status(200).json({ 
            transactions, 
            total, 
            page: Number(page), 
            perPage: Number(perPage),
            monthNumber 
        });
    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch transactions',
            details: error.message 
        });
    }
};

// Get monthly statistics
// Backend route handler
const getStatistics = async (req, res) => {
    try {
        const { month = '' } = req.query;

        const monthMapping = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        };

        const monthNumber = monthMapping[month] || new Date().getMonth() + 1;

        const statistics = await Transaction.aggregate([
            { 
                $match: { 
                    $expr: { 
                        $eq: [{ $month: '$dateOfSale' }, monthNumber] 
                    } 
                } 
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: { $cond: ['$sold', '$price', 0] } },
                    totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } },
                    totalUnsoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
                }
            }
        ]);

        // Log the aggregation result
        console.log('Statistics Aggregation Result:', statistics);

        res.status(200).json(statistics[0] || {
            totalSaleAmount: 0,
            totalSoldItems: 0,
            totalUnsoldItems: 0
        });
    } catch (error) {
        console.error('Statistics error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch statistics',
            details: error.message 
        });
    }
};


// Get bar chart data for a selected month
const getBarChartData = async (req, res) => {
    try {
        const { month = '' } = req.query;

        // Month mapping
        const monthMapping = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        };

        // Convert month name to number
        const monthNumber = monthMapping[month] || new Date().getMonth() + 1;

        // Define price ranges
        const priceRanges = [
            { range: '0 - 100', min: 0, max: 100 },
            { range: '101 - 200', min: 101, max: 200 },
            { range: '201 - 300', min: 201, max: 300 },
            { range: '301 - 400', min: 301, max: 400 },
            { range: '401 - 500', min: 401, max: 500 },
            { range: '501 - 600', min: 501, max: 600 },
            { range: '601 - 700', min: 601, max: 700 },
            { range: '701 - 800', min: 701, max: 800 },
            { range: '801 - 900', min: 801, max: 900 },
            { range: '901 and above', min: 901, max: Infinity }
        ];

        // Aggregate to count items in each price range
        const barChartData = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                $and: [
                    { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } },
                    { price: { $gte: range.min } },
                    { price: { $lte: range.max } }
                ]
            });

            return {
                range: range.range,
                count
            };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        console.error('Bar chart data error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch bar chart data',
            details: error.message 
        });
    }
};

// Get pie chart data for a selected month
const getPieChartData = async (req, res) => {
    try {
        const { month = '' } = req.query;

        // Month mapping
        const monthMapping = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        };

        // Convert month name to number
        const monthNumber = monthMapping[month] || new Date().getMonth() + 1;

        // Aggregate to count items by category
        const pieChartData = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: '$_id',
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Pie chart data error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch pie chart data',
            details: error.message 
        });
    }
};

// Get combined data
const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        // Fetch all data concurrently
        const [statistics, barChartData, pieChartData] = await Promise.all([
            Transaction.aggregate([
                { 
                    $match: { 
                        $expr: { 
                            $eq: [{ $month: '$dateOfSale' }, monthMapping[month]] 
                        } 
                    } 
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: { $cond: ['$sold', '$price', 0] } },
                        totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } },
                        totalUnsoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
                    }
                }
            ]),
            getBarChartData({ query: { month } }),
            getPieChartData({ query: { month } })
        ]);

        res.status(200).json({
            statistics: statistics[0] || {
                totalSaleAmount: 0,
                totalSoldItems: 0,
                totalUnsoldItems: 0
            },
            barChartData,
            pieChartData
        });
    } catch (error) {
        console.error('Combined data error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch combined data',
            details: error.message 
        });
    }
};

module.exports = {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
};