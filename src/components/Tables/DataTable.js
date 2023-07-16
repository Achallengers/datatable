import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useData } from '../../contexts/DataTableContext'; 

const DataTable = () => {
  const { filteredData } = useData();
  const data = filteredData;
 
  const columns = useMemo(
    () => [
      {
        accessorKey: 'date',
        header: 'Dados',
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        accessorKey: 'amount',
        header: 'Valencia',
      },
      {
        accessorKey: 'name.firstName',
        header: 'Nome operador Transacionado',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        enableClickToCopy: true,
      },
    ],
    [],
  );

  return (
    <MaterialReactTable columns={columns}  
      data={data} 
      //  enableColumnFilterModes
      //  enableColumnOrdering  (Podemos arrastar as colunas e reordena-las)
      //  enableEditing
      //  enablePinning
      //  enableRowActions
      //  enableRowSelection
      //  enableSelectAll={false}
      //  initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      enableDensityToggle={false}
      enableHiding={false}
      // memoMode="cells"
      // memoMode="rows"
      enableColumnActions={false} //no need for column actions if none of them are enabled
      enableColumnFilters={false} //filtering does not work with memoized table body
      enableGlobalFilter={true} //searching does not work with memoized table body
      enablePagination={false} //pagination does not work with memoized table body
      enableSorting={true}
      localization={MRT_Localization_PT_BR} 
    />
  );
};

export default DataTable;
