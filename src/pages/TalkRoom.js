import React from "react";
import Messages from "./Messages";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

const TalkRoom = () => {
  const classes = useStyles();

  return (
    <>
      <h1>TalkRoom</h1>
      <List className={classes.root}>
        <Messages />
      </List>
    </>
  );
};

export default TalkRoom;
