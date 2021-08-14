import React, { useState, useEffect } from "react";
import { styles, useStyles } from "./Styles";
import { toTitleCase } from "../../Utils/CamelCase";
import { baseUrl } from "../../Redux/apis/server";
import { editPostAction } from "../../Redux/actions";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import PreviewMedia from "./EditPreviewMedia";

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditPost({ open, setOpen, post }) {
  const state = useSelector((state) => state.auth);
  // const postState = useSelector((state) => state.posts);
  // const [loaded, setLoaded] = useState(false);
  // console.log(postState.singlePost);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [media, setMedia] = useState([]);
  const [content, setContent] = useState("");
  const [uploadType, setUploadType] = useState("1");
  const [uploadedMedia, setUploadedMedia] = useState([]);

  useEffect(() => {
    // if (!loaded) {
    setContent(post ? post.description : "");
    setUploadType(post ? post.postCategoryId : "1");
    setUploadedMedia(post ? [...post.postMedia] : []);
    // setLoaded(true);
    // }
  }, [open, post]);

  const handleClose = () => {
    setOpen(false);
    setMedia([]);
    setContent("");
    setUploadType("1");
    setUploadedMedia([]);
    // setLoaded(false);
  };

  const handleMedia = (e) => {
    setMedia([...media, ...e.target.files]);
  };

  const handleEditPost = async () => {
    if (content || media.length !== 0) {
      const data = new FormData();
      data.append("postCategoryId", parseInt(uploadType));
      data.append("description", content);
      if (media.length !== 0) {
        for (let file of media) {
          data.append("files[]", file);
        }
      }
      dispatch(editPostAction(post.id, data));
      handleClose();
    }
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Post
        </DialogTitle>
        <DialogContent dividers style-={{ position: "relative" }}>
          <Grid container spacing={1}>
            <Grid item xs="4" sm="2" md="1" lg="1">
              <Avatar
                src={
                  state.user && state.user.profileImageUrl
                    ? baseUrl + state.user.profileImageUrl
                    : ""
                }
                className={classes.avatar}
              />
            </Grid>

            <Grid item xs="8" sm="10" md="11" lg="11">
              <Typography variant="span" className={classes.bold}>
                {toTitleCase(
                  state.user.first_name + " " + state.user.last_name
                )}
              </Typography>
              <Box>
                <Select
                  id="demo-simple-select"
                  inputProps={{
                    name: "category",
                    id: "age-simple",
                  }}
                  onChange={(e) => setUploadType(e.target.value)}
                  value={uploadType}
                >
                  <MenuItem value="1">Friends</MenuItem>
                  <MenuItem value="2">Jobs</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <InputBase
              className={classes.description}
              placeholder="What's in your mind?"
              inputProps={{ "aria-label": "naked" }}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
            />
          </Box>

          <Box className={classes.absolute}>
            <input
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="image"
              onChange={(e) => handleMedia(e)}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                // startIcon={<AddIcon />}
                style={{ zIndex: 10000 }}
              >
                <AddIcon />
              </Button>
            </label>
          </Box>

          {/*  */}
          <PreviewMedia
            urls={media}
            setUrls={setMedia}
            uploadedMedia={uploadedMedia}
            setUploadedMedia={setUploadedMedia}
            post={post}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            variant="contained"
            onClick={handleEditPost}
          >
            Edit Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
