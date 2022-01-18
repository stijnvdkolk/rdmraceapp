import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Buttoned from '../button/button';
import { useEffect, useState } from 'react';
import { ConsumeEffect } from '../../API/ApiCalls';
import { deleteInvite, getInvites } from '../../API/Chat';
import Invite from '../../classes/invites';

function datagridDeleteButton(params: GridRenderCellParams) {
  return (
    <Button
      onClick={() => {
        deleteInvite(params.row.id).then(() => window.location.reload());
      }}
    >
      {params.value}
    </Button>
  );
}

// column names + their respective field names, width, and other specifications
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 180 },
  { field: 'role', headerName: 'Role', width: 180 },
  { field: 'amountUsed', headerName: 'AmountUsed', width: 180 },
  { field: 'maxuses', headerName: 'MaxUses', width: 180, sortable: false },
  { field: 'expiry', headerName: 'ExpiryDate', width: 180 },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => datagridDeleteButton(params),
  },
];

export default function InviteList() {
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [invites, setInvites] = useState<Invite[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsCLoaded, setInvites, () => {
      return getInvites();
    });
  }, [page]);

  const rows = invites?.map((invite) => {
    return {
      id: invite.id,
      role: invite.role,
      amountUsed: invite.amountUsed,
      maxuses: invite.maxUses,
      expiry: new Date(invite.expireAt).toLocaleString(),
      delete: <Buttoned text="Delete Invite" />,
    };
  });
  // let history = useHistory();

  return (
    <div
      style={{ height: 500, width: '90%', padding: '5%', paddingTop: '30px' }}
    >
      <DataGrid
        rows={rows!}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        onPageChange={(e) => {
          setPage(e);
        }}
      />
    </div>
  );
}
