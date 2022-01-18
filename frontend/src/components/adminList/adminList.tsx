import {
  DataGrid,
  GridApi,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from "@mui/x-data-grid";
import Buttoned from "../button/button";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getPeople, getSelf, getPeopleAdmin } from "../../API/Chat";
import Person from "../../classes/Person";
import { useHistory } from "react-router-dom";

function datagridButton(params: GridRenderCellParams){
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const api: GridApi = params.api;
  return (
    <Button
      onClick={() => {
        window.location.href = `/editprofile/${params.row.id}`;
      }}
    >
      {params.value}
    </Button>
  );
};

// column names + their respective field names, width, and other specifications
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "userName", headerName: "Username", width: 180 },
  { field: "role", headerName: "Roles", width: 190, sortable: false },
  {
    field: "manage",
    headerName: "Manage",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => datagridButton(params),
  },
];
// the actual values that will be passed on to the AdminList

class PeopleMaker {
  id!: number;
  userName!: string;
  role!: string;
  manage!: any;
}

// makes a mui datagrid to show the users, channels, etc.
export default function AdminList() {
  const [page, setPage] = useState(0);
  const [error, setError] = useState<any>(null);
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsCLoaded, setcontacts, () => {
      return getPeopleAdmin(page); // get 500 users
    });
  }, [page]);

  const rows = contacts?.map((contact) => {
    return {
      id: contact.id!,
      userName: contact.username!,
      role: contact.role!,
      manage: <Buttoned text="Manage user" />,
    };
  });
  let history = useHistory();
  const onRowClicked = (params: GridCellParams) => {
    history.push(`/editprofile/${params.row.id}`);
  };

  return (
    <div
      style={{ height: 500, width: "90%", padding: "5%", paddingTop: "30px" }}
    >
      {isCLoaded ? (
      <DataGrid
        rows={rows!}
        columns={columns}
        rowsPerPageOptions={[10, 20, 50, 100]}
        checkboxSelection
        onPageChange={(e) => {
          setPage(e);
        }}
        onCellDoubleClick={(params, event) => {
          if(!event.ctrlKey){
            onRowClicked(params);
          }
        }}

      />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
