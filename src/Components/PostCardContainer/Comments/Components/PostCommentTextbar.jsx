import React, { useState } from "react";
import { addCommentToPostAction } from "../../../../Redux/actions";
import { baseUrl } from "../../../../Redux/apis/server";
import { withStyles, fade } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
      //   width: "100%",
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    // width: "auto",
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function PostCommentTextbar({ post }) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const hanedleCommentOnPost = () => {
    if (comment) {
      dispatch(addCommentToPostAction({ id: post.id, comment }));
      setComment("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs="2" lg="1" md="1">
          {" "}
          <Avatar
            aria-label="recipe"
            // className={classes.avatar}
            src={
              state.user && state.user.profileImageUrl
                ? baseUrl + state.user.profileImageUrl
                : ""
            }
          />
        </Grid>
        <Grid item xs="10" lg="11" md="11">
          <Box style={{ position: "relative", width: "100%" }}>
            <BootstrapInput
              placeholder="Add a Comment"
              style={{ width: "100%" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton
              style={{ position: "absolute", right: 0, top: "-2px" }}
              onClick={hanedleCommentOnPost}
            >
              <SendIcon color="primary" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
