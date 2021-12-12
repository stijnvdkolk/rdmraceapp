import * as React from "react";
import Button from "@mui/material/Button";
import IProps from "../IProps";
import { useHistory } from "react-router-dom";

interface buttonProps extends IProps {
  url?: string;
  text?: string;
}

// makes a button. needs a url, button text, and also needs to be styled to fit mock-ups
export default function Buttoned(props: buttonProps) {
  const { url, text, style } = props;
  let history = useHistory();
  const redirect = (page: string | undefined) => {
    history.push(`/${page}`);
  };
  return (
    <div className="but">
      <Button variant="contained" style={style} onClick={() => redirect(url)}>
        {text}
      </Button>
    </div>
  );
}
