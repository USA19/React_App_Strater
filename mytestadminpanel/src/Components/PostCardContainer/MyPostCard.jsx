import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toTitleCase } from "../../Utils/CamelCase";
import { deletePostAction } from "../../Redux/actions";
import { baseUrl } from "../../Redux/apis/server";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  moreIcon: {
    position: "absolute",
    top: 0,
    // right: 0,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function MyPostCard({ posts, setPost, setEditPostOpen }) {
  const classes = useStyles();
  const [postId, setPostId] = React.useState();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  // const dispatch = useDispatch();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = () => {
    dispatch(deletePostAction(postId));
    handleMenuClose();
  };
  const handleEdit = () => {
    setEditPostOpen(true);
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handlePostClick = (post) => {
    setPostId(post.id);
    setPost(post);
  };
  console.log(posts);
  return posts && posts.length !== 0
    ? posts.map((post) => (
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg="3" md="4" sm="6" xs="12">
              <Card className={classes.root}>
                {state.user.id === post.userId ? (
                  <>
                    <div onClick={() => handlePostClick(post)}>
                      <IconButton
                        aria-label="settings"
                        className={classes.moreIcon}
                        onClick={handleProfileMenuOpen}
                        style={{ zIndex: "1000" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      id={"primary-search-account-menu"}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={isMenuOpen}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>

                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </>
                ) : (
                  ""
                )}
                {post.postMedia && post.postMedia.length !== 0 ? (
                  <Carousel>
                    {post.postMedia.map((media) => (
                      <Link to={`/post/${post.id}`}>
                        <CardMedia
                          // component="img"
                          // component="video"
                          // height="140"
                          className={classes.media}
                          image={baseUrl + media.mediaUrl}
                          // image="/video.webm"
                          title={toTitleCase(
                            `${post.user ? post.user.first_name : ""} ${
                              post.user ? post.user.last_name : ""
                            }`
                          )}
                        />
                      </Link>
                    ))}
                  </Carousel>
                ) : (
                  ""
                )}
              </Card>
            </Grid>
          </Grid>
        </Container>
      ))
    : "";
}
