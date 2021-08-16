import React from "react";
import { baseUrl } from "../../../Redux/apis/server";
// import PostCommentTextbar from "./Components/PostCommentTextbar";
import { toTitleCase } from "../../../Utils/CamelCase";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  replyText: {
    textDecoration: "underline",
    fontSize: "12px",

    marginLeft: "70px",
  },
  replyContainer: {
    // paddingLeft: "16px",
    // paddingRight: "16px",
    marginLeft: "40px",
    marginTop: "10px",
  },
}));

export default function AlignItemsList({ post }) {
  const classes = useStyles();
  // const [showReply, setShowReply] = useState(false);

  // const handleShowReply = (id) => {
  //   setShowReply(id ? id : false);
  // };
  return post && post.comments && post.comments.length !== 0 ? (
    <List className={classes.root}>
      {post.comments.map((comment) => {
        return (
          <>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar
                  alt={toTitleCase(
                    `${comment.user ? comment.user.first_name : ""} ${
                      comment.user ? comment.user.last_name : ""
                    }`
                  )}
                  src={
                    comment.user && comment.user.profileImageUrl
                      ? baseUrl + comment.user.profileImageUrl
                      : ""
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={toTitleCase(
                  `${comment.user ? comment.user.first_name : ""} ${
                    comment.user ? comment.user.last_name : ""
                  }`
                )}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.comment}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {/* <Typography
              component="span"
              onClick={() => handleShowReply(comment.id)}
              className={classes.replyText}
            >
              Reply
            </Typography>

            {showReply === comment.id ? (
              <Box className={classes.replyContainer}>
                <PostCommentTextbar />
              </Box>
            ) : (
              ""
            )} */}
          </>
        );
      })}
    </List>
  ) : (
    ""
  );
}
