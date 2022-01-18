import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getSpecificInvite } from "../../API/Chat";
import Invite, { requestedInvite } from "../../classes/invites";

interface CodeParams {
    Code: string | undefined;
  }
export default function InviteWindow() {
    const { Code } = useParams<CodeParams>()
    const [isValid, setIsValid] = useState<boolean>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [invite, setInvite] = useState<requestedInvite | undefined>(undefined);
    useEffect(() => {
        if(Code){
            ConsumeEffect(setIsLoaded, setInvite, () => getSpecificInvite(Code!));
        }
    }, [Code])
    useEffect(() => {
        console.log(invite)
        if (invite) {
            setIsValid(invite.isValid);
        }
    }, [invite])
    let history = useHistory();
    useEffect(() => {
        console.log(invite)
        if (invite !== undefined) {
            if (isValid) {
                history.push(`/Signup/${Code}`);
            }
            else{
                history.push("/Invalid");
            }
        }
    }, [isValid])
    return (
        <div>
            <Typography variant="h3" color="primary"> 
                Looks empty, try using a valid invite code
            </Typography>
        </div>
    );
}