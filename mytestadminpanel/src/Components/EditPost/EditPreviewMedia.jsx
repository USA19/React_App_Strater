import React from "react";
import { deletePostMediaAction } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { baseUrl } from "../../Redux/apis/server";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "10px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  icon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    fontSize: "14px",
    cursor: "pointer",
  },
}));

export default function PreviewMededia({
  urls,
  setUrls,
  uploadedMedia,
  setUploadedMedia,
  post,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (i) => {
    let arrayOfImages = [];
    urls.map((file, index) => {
      if (index !== i) {
        arrayOfImages.push(file);
      }

      return arrayOfImages;
    });
    setUrls([...arrayOfImages]);
  };
  const handleUploadedMediaDelete = (id) => {
    dispatch(deletePostMediaAction({ postId: post.id, imageId: id }));
    let mediaUrls = [];
    for (let media of uploadedMedia) {
      if (media.id !== id) {
        mediaUrls.push(media);
      }
    }
    setUploadedMedia(mediaUrls);
  };
  return (
    <>
      {uploadedMedia.length !== 0
        ? uploadedMedia.map((url) => (
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={baseUrl + url.mediaUrl}
              />
              <CancelIcon
                className={classes.icon}
                onClick={() => handleUploadedMediaDelete(url.id)}
              />
            </Card>
          ))
        : ""}
      {urls.length !== 0
        ? urls.map((url, i) => (
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                // src={URL.createObjectURL(url)}
                src={URL.createObjectURL(
                  new Blob([new Uint8Array(url)], { type: "octet/stream" })
                ).slice(5)}
              />
              <CancelIcon
                className={classes.icon}
                onClick={() => handleDelete(i)}
              />
            </Card>
          ))
        : ""}
    </>
  );
}
// URL.createObjectURL(file);
