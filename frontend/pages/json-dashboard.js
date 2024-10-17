// JSONDashboard.js
'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DataGrid , GridToolbar } from '@mui/x-data-grid'; // Import DataGrid directly from Material-UI
import Header from '../components/Header';

const JsonDashboard = () => {
  const pathname = usePathname();
  const type = pathname.split('/').pop(); // Extract the last segment from the path

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'originationTime', headerName: 'Origination Time', width: 180 },
    { field: 'clusterId', headerName: 'Cluster ID', width: 150 },
    { field: 'userId', headerName: 'User ID', width: 120 },
    { field: 'phone', headerName: 'Phone', width: 180 },
    { field: 'voicemail', headerName: 'Voicemail', width: 180 },
  ];

  const [data, setData] = useState([]);

  // Fetch data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('sample_data.json'); // Adjust the path based on your structure
        const jsonData = await response.json();
        const dataWithIds = jsonData.map((item, index) => ({
          ...item,
          id: item._id || index,
          phone: item.devices?.phone || '', // Flattening the nested field
          voicemail: item.devices?.voicemail || '', // Flattening the nested field
      }));

        setData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1>JSON Dashboard (utilizes local JSON data)</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={data} // Use the loaded data as rows
          columns={columns} 
          pageSize={10} // Default page size
          rowsPerPageOptions={[10, 20, 50]} // Options for rows per page
          checkboxSelection // Allows for row selection
          slots={{ toolbar: GridToolbar }} 
        />
      </div>
    </>
  );
};

export default JsonDashboard;
