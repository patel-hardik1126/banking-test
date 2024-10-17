import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { get, setAuthToken } from 'utils/apiInstance';
import { debounce } from 'lodash';

const CustomDataGrid = ({ apiEndpoint, columns, initialPageSize = 10 }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: initialPageSize,
        page: 0,
    });
    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({ items: [] });

    const token = useSelector((state) => state.auth.token);

    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
          setAuthToken(token);
  
          const ordering = sortModel.length > 0
              ? `${sortModel[0].sort === 'desc' ? '-' : ''}${sortModel[0].field}`
              : undefined;
  
          const filters = filterModel.items?.reduce((acc, filter) => {
              acc[filter.field+"__"+filter.operator] = filter.value;
              return acc;
          }, {});
  
          // API request with pagination parameters
          const response = await get(apiEndpoint, {
              page: paginationModel.page + 1, // API uses 1-based index for pagination
              page_size: paginationModel.pageSize,
              ordering,
              filters: { ...filters },
          });
  
          const dataWithIds = response.results.map((item, index) => ({
              ...item,
              id: item.id || index,
              phone: item.devices?.phone || '', // Flattening the nested field
              voicemail: item.devices?.voicemail || '', // Flattening the nested field
          }));
  
          setData(dataWithIds);
          setTotalRows(response.count); // Total number of rows for pagination
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  }, [apiEndpoint, paginationModel, sortModel, filterModel, token]);
  

    const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

    useEffect(() => {
        debouncedFetchData();
        return debouncedFetchData.cancel; // Cleanup debounce on unmount
    }, [debouncedFetchData]);

    useEffect(() => {
        fetchData(); // Fetch data whenever pagination changes
    }, [paginationModel]);

    return (
        <div style={{ height: 490, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 20, 50, 100]}
                paginationMode="server"
                rowCount={totalRows}
                pagination
                loading={loading}
                onSortModelChange={(model) => {
                    setSortModel(model);
                    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page when sorting changes
                }}
                onFilterModelChange={(model) => {
                    setFilterModel(model);
                    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page when filters change
                }}
                filterMode="server"
                slots={{ toolbar: GridToolbar }} 
            />
        </div>
    );
};

export default CustomDataGrid;
