import React from "react";
import { likePostAction } from "../../Redux/actions";
import { toTitleCase } from "../../Utils/CamelCase";
import { returnLike } from "../../Utils/likeHelper";
import { deletePostAction, unLikePostAction } from "../../Redux/actions";
import CommentsSection from "./Comments/Comments";
import PostCommentTextbar from "./Comments/Components/PostCommentTextbar";
import { baseUrl } from "../../Redux/apis/server";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel"; //carousel
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "blue",
  },
}));

export default function RecipeReviewCard({ posts, setPost, setEditPostOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const state = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postId, setPostId] = React.useState();
  const isMenuOpen = Boolean(anchorEl);

  const handleExpandClick = (panel) => {
    setExpanded(panel ? panel : false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
  const handlePostClick = (post) => {
    setPostId(post.id);
    setPost(post);
  };
  return posts && posts.length !== 0
    ? posts.map((post) => (
        <Card className={classes.root}>
          <div
            style={{ display: "flex" }}
            onClick={() => handlePostClick(post)}
          >
            {state.user.id === post.userId ? (
              <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            ) : (
              ""
            )}
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={
                    post.user && post.user.profileImageUrl
                      ? baseUrl + post.user.profileImageUrl
                      : ""
                  }
                />
              }
              // action={

              // }
              title={toTitleCase(
                `${post.user ? post.user.first_name : ""} ${
                  post.user ? post.user.last_name : ""
                }`
              )}
              subheader={new Date(post.createdAt).toDateString()}
            />
          </div>
          {state.user.id === post.userId ? (
            <>
              {/* <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
                <MoreVertIcon />
              </IconButton> */}
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

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post ? post.description : ""}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {returnLike(state.user.id, post.likes) ? (
              <IconButton
                aria-label="add to favorites"
                onClick={() => dispatch(unLikePostAction({ id: post.id }))}
              >
                <FavoriteIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="add to favorites"
                onClick={() => dispatch(likePostAction({ id: post.id }))}
              >
                <FavoriteBorderIcon color="secondary" />
              </IconButton>
            )}
            <IconButton
              aria-label="Comment"
              onClick={() => handleExpandClick(post.id)}
            >
              <CommentIcon />
            </IconButton>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
          <Collapse in={expanded === post.id} timeout="auto" unmountOnExit>
            <PostCommentTextbar post={post} />
            <CardContent>
              <CommentsSection post={post} />
            </CardContent>
          </Collapse>
        </Card>
      ))
    : "";
}
