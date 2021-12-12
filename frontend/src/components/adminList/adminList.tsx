import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Buttoned from '../button/button';

// column names + their respective field names, width, and other specifications
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'userName', headerName: 'Username', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'role', headerName: 'Roles', width: 190 },
    { field: 'manage', headerName: 'Manage', width: 200, sortable: false },
];
// the actual values that will be passed on to the AdminList
const rows = [
    { id: 1, userName: 'Stijn', email: 'stijn@rdmraceapp.nl', role: 'Admin', manage: <Buttoned text='manage user'/> }, // need to figure out a way to make the button usable in the datagrid
    { id: 2, userName: 'Melissa', email: 'Melissa@rdmraceapp.nl', role: 'Marketing', manage: <Buttoned text='manage user'/> },
    { id: 3, userName: 'Hugo', email: 'hugo@rdmraceapp.nl', role: 'Sponsor', manage: <Buttoned text='manage user'/> },
    { id: 4, userName: 'David', email: 'david@rdmraceapp.nl', role: 'Team member', manage: <Buttoned text='manage user'/> },
    { id: 5, userName: 'Bjorn', email: 'bjorn@rdmraceapp.nl', role: 'Team member', manage: <Buttoned text='manage user'/> },
    { id: 6, userName: 'Henk', email: 'henk@rdmraceapp.nl', role: 'Team member', manage: <Buttoned text='manage user'/> },
    { id: 7, userName: 'Daimon', email: 'daimon@rdmraceapp.nl', role: 'Sponsor', manage: <Buttoned text='manage user'/> },
    { id: 8, userName: 'Emily', email: 'emily@rdmraceapp.nl', role: 'Admin', manage: <Buttoned text='manage user'/> },
];

// makes a mui datagrid to show the users, channels, etc.
export default function AdminList() {
  return (
    <div style={{ height: 400, width: '90%', padding: '5%', paddingTop: '30px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}