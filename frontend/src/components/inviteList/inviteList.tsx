import {
  DataGrid,
  GridApi,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getInvites } from "../../API/Chat";
import Invite from "../../classes/invites";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const datagridButton = (params: GridRenderCellParams) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const api: GridApi = params.api;

  return (
    <Button
     
    >
      {params.value}
    </Button>
  );
};

// column names + their respective field names, width, and other specifications
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "code", headerName: "Code", width: 180 },
  { field: "role", headerName: "Role", width: 180 },
  { field: "amountUsed", headerName: "AmountUsed", width: 180 },
  { field: "maxuses", headerName: "MaxUses", width: 180, sortable: false },
  { field: "expiry", headerName: "ExpiryDate", width: 180 },
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
      code: invite.code,
      role: invite.role,
      amountUsed: invite.amountUsed,
      maxuses: invite.maxUses,
      expiry: new Date(invite.expireAt).toLocaleString(),
    };
  });
  // let history = useHistory();

  return (
    <div
      style={{ height: 500, width: "90%", padding: "5%", paddingTop: "30px" }}
    >
      <DataGrid
        rows={rows!}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onPageChange={(e) => {
          setPage(e);
        }}
      />
    </div>
  );
}
