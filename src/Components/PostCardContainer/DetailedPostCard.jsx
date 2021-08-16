import React from "react";
import CommentsSection from "./Comments/Comments";
import { likePostAction, unLikePostAction } from "../../Redux/actions";
import { toTitleCase } from "../../Utils/CamelCase";
import { returnLike } from "../../Utils/likeHelper";
import { baseUrl } from "../../Redux/apis/server";
import PostCommentTextbar from "./Comments/Components/PostCommentTextbar";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel"; //carousel
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "100%",
  //   },
  media: {
    height: 0,
    paddingTop: "70%",
  },

  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function RecipeReviewCard({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);
  return (
    <Grid container>
      <Grid item sm="12" md="6" lg="7">
        <Box mt={3}>
          <Card className={classes.root}>
            <Carousel>
              {post && post.postMedia && post.postMedia.length !== 0
                ? post.postMedia.map((media) => (
                    <CardMedia
                      className={classes.media}
                      image={baseUrl + media.mediaUrl}
                      // image="/video.webm"
                      title={toTitleCase(
                        `${post.user ? post.user.first_name : ""} ${
                          post.user ? post.user.last_name : ""
                        }`
                      )}
                    />
                  ))
                : ""}
            </Carousel>
          </Card>
        </Box>
      </Grid>
      <Grid item sm="12" md="6" lg="5">
        <Box mt={3}>
          <Box>
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
              title={toTitleCase(
                `${post.user ? post.user.first_name : ""} ${
                  post.user ? post.user.last_name : ""
                }`
              )}
              subheader={new Date(post.createdAt).toDateString()}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {post ? post.description : ""}
              </Typography>
            </CardContent>
            <CardActions>
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
              <IconButton aria-label="Comment">
                <CommentIcon />
              </IconButton>
              {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
            </CardActions>
          </Box>
          <CommentsSection post={post} />
          <PostCommentTextbar post={post} />
        </Box>
      </Grid>
    </Grid>
  );
}
