import "../styles/MyPhotos.scss";
import React, { useState, useEffect } from "react";
import {
  Chip,
  Stack,
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Button,
  Typography,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  remove,
  edit,
  orderBy,
  selectMyPhotos,
} from "../slices/myPhotosSlice.js";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export function MyPhotos() {
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#ffffff",
        contrastText: "#fff",
      },
      myBlue: {
        main: "#685cf4",
        contrastText: "#fff",
      },
    },
  });

  const myImages = useSelector(selectMyPhotos);
  const dispatch = useDispatch();
  //REMOVE
  const removePhotoHandler = (image) => {
    dispatch(remove(image));
  };
  //EDIT
  const [editing, setEditing] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const editPhotoHandler = (image) => {
    setEditing(image.id);
  };

  const inputHandler = (e) => {
    const myDescription = e.target.value;
    setNewDescription(myDescription);
  };

  const saveNewDescription = () => {
    dispatch(edit({ id: editing, description: newDescription }));
    setEditing(null);
  };

  //ORDER BY
  const [select, setSelect] = useState("");

  const handleSelect = (e) => {
    e.preventDefault();
    const newSelect = e.target.value;
    setSelect(newSelect);
    dispatch(orderBy(newSelect));
  };

  //FILTER
  const [filteredTerm, setFilteredTerm] = useState("");
  const handleSearchDescription = (e) => {
    setFilteredTerm(e.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const imageArray = myImages.myPhotos.map((photo) => {
    return {
      id: photo.id,
      width: photo.width,
      height: photo.height,
      description: photo.alt_description,
      likes: photo.likes,
      urlFull: photo.urls.full,
      urlRegular: photo.urls.regular,
      urlThumb: photo.urls.thumb,
      date: photo.date,
      tag: photo.tag,
    };
  });

  const download = (image) => {
    window.open(image.urlFull, "_blank");
  };

  //CHIPS
  const [existingTags, setExistingTags] = useState([]);
  const [tagObj, setTagsObj] = useState({});
  useEffect(() => {
    const tagsArray = [...new Set(imageArray.map((image) => image.tag))];
    setExistingTags(tagsArray);
    setTagsObj(tagsArray.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));
  }, [myImages]);

  const handleToggleTag = (tag) => {
    setTagsObj((prev) => ({ ...prev, [tag]: prev[tag] === false }));
  };

  return (
    <div id="my-photos">
      <ThemeProvider theme={theme}>
        <div className="photo-filters">
          <TextField
            className="search-description"
            id="outlined-basic"
            label="Search description..."
            variant="outlined"
            color="myBlue"
            onChange={handleSearchDescription}
          />
          <FormControl className="select-order">
            <InputLabel id="demo-simple-select-label">Sort By...</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label="Order"
              onChange={handleSelect}
              color="myBlue"
            >
              <MenuItem value={"date"}>Date</MenuItem>
              <MenuItem value={"width"}>Width</MenuItem>
              <MenuItem value={"height"}>Height</MenuItem>
              <MenuItem value={"likes"}>Likes</MenuItem>
            </Select>
          </FormControl>
          <Stack className="tag-list" direction="row" spacing={1}>
            {existingTags.map((tag) => (
              <Chip
                className="tag"
                color="myBlue"
                variant={tagObj[tag] ? "contained" : "outlined"}
                key={tag}
                label={tag}
                onClick={() => handleToggleTag(tag)}
              />
            ))}
          </Stack>
        </div>
        <div className="image-list">
          {imageArray?.length === 0 ? (
            <div class="background">
              <img
                className="animate__animated animate__bounce empty-message"
                src="https://fontmeme.com/permalink/211116/bebccb3a10ef472cae8c6d3d94faccc5.png"
                alt="fuentes-de-grafiti"
                border="0"
              />
              <img
                className="folder"
                src="data:image/png;base64,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"
              ></img>
            </div>
          ) : (
            <ImageList cols={4}>
              {imageArray
                .filter((image) => {
                  if (filteredTerm == "") {
                    return image;
                  } else if (
                    String(image.description)
                      .toLowerCase()
                      .includes(filteredTerm.toLowerCase())
                  ) {
                    return image;
                  }
                })
                .filter((image) => tagObj[image.tag])
                .map((image) => (
                  <ImageListItem
                    className="image-container"
                    key={image.id}
                    sx={{ maxWidth: 300 }}
                  >
                    <img
                      src={image.urlRegular}
                      description={image.description}
                    />
                    <ImageListItemBar
                      className="image-item-bar"
                      position="bottom"
                      subtitle={
                        <div>
                          <ul className="image-text">
                            <li id="description">
                              {image.description
                                ? capitalizeFirstLetter(image.description)
                                : image.description}
                            </li>
                            <li>
                              Size: {image.height}x{image.width}
                            </li>
                            <li>❤ {image.likes}</li>
                            <li>Added: {image.date}</li>
                          </ul>
                          <div
                            className="photo-buttons"
                            style={{
                              display: "block",
                              textAlign: "center",
                              opacity: 0.8,
                              padding: 5,
                            }}
                          >
                            <Button
                              variant="text"
                              onClick={() => removePhotoHandler(image)}
                              color="neutral"
                            >
                              <BiTrash size="1.5em" />
                            </Button>
                            <Button
                              variant="text"
                              onClick={() => editPhotoHandler(image)}
                              color="neutral"
                            >
                              <BiEditAlt size="1.5em" />
                            </Button>
                            <Button
                              variant="text"
                              onClick={() => download(image)}
                              color="neutral"
                            >
                              <MdOpenInNew size="1.5em" />
                            </Button>
                          </div>
                        </div>
                      }
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          )}
        </div>
        <Modal
          open={editing != null}
          onClose={() => setEditing(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableScrollLock="true"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 200,
              color: "white",
              bgcolor: "background.paper",
              border: "2px solid white",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ display: "block", textAlign: "center", paddingTop: 50 }}
            >
              Write a new description:
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{
                bgcolor: "background.paper",
                display: "block",
                textAlign: "center",
              }}
            >
              <input
                onChange={inputHandler}
                placeholder="type something here..."
                style={{ height: 10, padding: 12, margin: 2, border: "none" }}
              ></input>
              <Button
                variant="contained"
                color="myBlue"
                onClick={saveNewDescription}
              >
                Save
              </Button>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
