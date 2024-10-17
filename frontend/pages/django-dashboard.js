// DjangoDashboard.js
'use client';
import React, { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import CustomDataGrid from '../components/CustomDataGrid'; 
import Header from '../components/Header';

const DjangoDashboard = () => {
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


  return (
    
    <>
      <Header />
      <h1>Django Dashboard (utilizes MSSQL Database)</h1>
      <div><CustomDataGrid 
              apiEndpoint={`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/voicemails/v1/details/`} 
              columns={columns} 
              initialPageSize={10} 
            />
        </div>
            </>
  );
};

export default DjangoDashboard;