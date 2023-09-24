import React from "react";
import { Alert } from "@mui/material";

interface MessageProps {
  message: string | null;
  severity: "success" | "error" | "info" ;
}

const Message: React.FC<MessageProps> = ({ message, severity }) => {
  return message ? (
    <Alert severity={severity} sx={{ marginTop: 2 }}>
      {message}
    </Alert>
  ) : null;
};

export default Message;