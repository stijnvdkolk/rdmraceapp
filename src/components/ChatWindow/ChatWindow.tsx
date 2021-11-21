import { useParams } from "react-router-dom";

export default function ChatWindow() {
    
    let {channelID} = useParams<{ channelID?: string }>();
    return (
        <div id="Windows">
            <p>{channelID}</p>
        </div>
    );    
}