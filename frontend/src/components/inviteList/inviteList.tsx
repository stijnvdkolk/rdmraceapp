import {
  DataGrid,
  GridApi,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getPeople } from "../../API/Chat";
import Person from "../../classes/Person";
import Invite from "../../classes/invites";

const datagridButton = (params: GridRenderCellParams) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const api: GridApi = params.api;

  return (
    <Button
      onClick={() => {
        console.log(api);
      }}
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
  const [error, setError] = useState<any>(null);
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [contacts, setcontacts] = useState<Invite[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsCLoaded, setcontacts, () => {
      return getPeople(page);
    });
  }, [page]);
  console.log(contacts);

  const rows = contacts?.map((contact) => {
    
    return {
      id: "w.i.p.",
      code: "w.i.p.",
      role: "w.i.p.",
      amountUsed: "w.i.p.",
      maxuses: "w.i.p.",
      expiry: "w.i.p.",
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
