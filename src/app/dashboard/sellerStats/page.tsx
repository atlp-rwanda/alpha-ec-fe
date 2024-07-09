'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RootState, AppDispatch } from '@/redux/hooks/hook';
import {
  fetchStats,
  setStartDate,
  setEndDate
} from '../../../redux/slices/statsSlice';

const Stats: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, startDate, endDate, loading, error } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        fetchStats({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        })
      );
    }
  }, [startDate, endDate, dispatch]);
  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      dispatch(setStartDate(date));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      dispatch(setEndDate(date));
    }
  };
  const chartData = data
    ? {
        labels: [
          'New Products',
          'Expired Products',
          'Stock Increment',
          'Stock Reduction',
          'Product Wished'
        ],
        datasets: [
          {
            label: 'Stats',
            data: [
              data.newProducts || 0,
              data.expiredProducts || 0,
              data.stockIncrement || 0,
              data.stockReduction || 0,
              data.productWished || 0
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    : {};

  return (
    <div>
      <h2>Product Statistics</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          onSelect={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          excludeScrollbar={true}
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          onSelect={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
          excludeScrollbar={true}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : chartData.datasets && chartData.labels ? (
        <Chart type="bar" data={chartData} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Stats;
