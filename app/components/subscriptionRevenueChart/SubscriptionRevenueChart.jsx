import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SubscriptionRevenueChart = ({graphData}) => {
    const [timeRange, setTimeRange] = useState('12 months');
    const [chartData, setChartData] = useState([]);
    
    // Sample data for testing - replace with your actual graphData prop
    // const sampleGraphData = {
    //     "success": true,
    //     "message": "Success",
    //     "data": {
    //         "2025-6": {
    //             "COMBO- Pass & Monitor": 56000,
    //             "Result Check": 14000,
    //             "BULK- Pass, Trade & Monitor": 32000,
    //             "COMBO- Pass & Trade": 28000,
    //             "BASIC- Monitor": 24000,
    //             "BASIC - Pass": 8200,
    //             "BASIC - Trade": 4000
    //         }
    //     }
    // };
    
    // Function to process API data
    useEffect(() => {
        const dataToUse = graphData
        if (!dataToUse || !dataToUse.data) return;

        // Transform API data for the chart
        const transformData = () => {
            // Updated categories mapping to match your API response
            const categories = {
                "BASIC - Pass": "Basic",
                "BASIC - Trade": "Basic",
                "BASIC- Monitor": "Basic",
                "COMBO- Pass & Monitor": "Combo",
                "COMBO- Pass & Trade": "Combo",
                "BULK- Pass, Trade & Monitor": "Bulk",
                "Result Check": "Result",
                // "Assignment": "Assignment"
            };

            // Create month labels and initialize data structure
            const monthLabels = [];
            const today = new Date();
            
            // Create a date object for each month based on the selected time range
            const monthsToInclude = timeRange === '12 months' ? 12 : 
                                    timeRange === '6 months' ? 6 : 
                                    timeRange === '1 month' ? 1 : 
                                    timeRange === '7 days' ? 1 : 12; // Default to 12

            for (let i = monthsToInclude - 1; i >= 0; i--) {
                const d = new Date(today);
                d.setMonth(d.getMonth() - i);
                const monthYearKey = `${d.getFullYear()}-${d.getMonth() + 1}`; // Format as YYYY-M
                const monthName = d.toLocaleString('default', { month: 'short' });
                monthLabels.push({ key: monthYearKey, name: monthName });
            }
            
            // Initialize data with all months and zero values
            const formattedData = monthLabels.map(month => ({
                name: month.name,
                key: month.key,
                Basic: 0,
                Combo: 0,
                Bulk: 0,
                Result: 0,
                // Assignment: 0
            }));

            // Fill in data from API response
            Object.entries(dataToUse.data).forEach(([dateKey, subscriptions]) => {
                // Find the matching month in our data
                const dataPoint = formattedData.find(item => item.key === dateKey);
                if (dataPoint) {
                    // Add up values for each category
                    Object.entries(subscriptions).forEach(([subType, value]) => {
                        const category = categories[subType];
                        if (category && dataPoint[category] !== undefined) {
                            dataPoint[category] += value;
                        }
                    });
                }
            });

            return formattedData;
        };

        setChartData(transformData());
    }, [timeRange, graphData]);

    const formatYAxis = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value;
    };

    const timeRangeOptions = ['12 months', '6 months', '1 month', '7 days'];

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-bold mb-4 text-gray-800">Subscription revenue chart</h2>
            
            {/* Time range selector */}
            <div className="flex space-x-2 mb-6 text-xs">
                {timeRangeOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => setTimeRange(option)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            timeRange === option
                                ? 'bg-gray-300 text-gray-800'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end mb-2 space-x-4 text-xs">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                    <span className="text-gray-600">Basic</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-gray-600">Combo</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
                    <span className="text-gray-600">Bulk</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                    <span className="text-gray-600">Result</span>
                </div>
                {/* <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-600">Assignment</span>
                </div> */}
            </div>
            
            {/* Chart */}
            <div className="w-full h-80 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280' }}
                        />
                        <YAxis 
                            tickFormatter={formatYAxis}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280' }}
                        />
                        <Tooltip formatter={(value) => formatYAxis(value)} />
                        <Area 
                            type="monotone" 
                            dataKey="Basic" 
                            stackId="1" 
                            stroke="#2DD4BF" 
                            fill="#2DD4BF" 
                            fillOpacity={0.6}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="Combo" 
                            stackId="1" 
                            stroke="#60A5FA" 
                            fill="#60A5FA" 
                            fillOpacity={0.6}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="Bulk" 
                            stackId="1" 
                            stroke="#1D4ED8" 
                            fill="#1D4ED8" 
                            fillOpacity={0.6}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="Result" 
                            stackId="1" 
                            stroke="#7C3AED" 
                            fill="#7C3AED" 
                            fillOpacity={0.6}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="Assignment" 
                            stackId="1" 
                            stroke="#A855F7" 
                            fill="#A855F7" 
                            fillOpacity={0.6}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            {/* Debug info - remove this in production */}
            {/* <div className="mt-4 text-xs text-gray-500">
                <p>Current month data: {JSON.stringify(chartData.find(d => d.key === '2025-6'))}</p>
            </div> */}
        </div>
    );
}

export default SubscriptionRevenueChart;