import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import NumberFormat from "react-number-format";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/actions/index";

// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDropzone } from "react-dropzone";
// * Package
import { cloneDeep } from "lodash";
// * Shared
import { checkValidity } from "../../../shared/checkValidity";
import { WithContext as ReactTags } from "react-tag-input";

import "./style.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1878f2",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "rgb(24, 120, 242)",
  backgroundColor: "rgba(24, 120, 242, 0.1)",
  color: "rgb(24, 120, 242)",
};

const acceptStyle = {
  borderColor: "#00e676",
  backgroundColor: "rgb(0 230 118 / 10%)",
  color: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "rgb(255 23 68 / 10%)",
  color: "#ff1744",
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<any>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
);

const AddProduct = () => {
  const dispatch = useDispatch();
  const [valueDate, setValueDate] = React.useState<Date | null>(null);

  const [controls, setControls] = React.useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "name",
        placeholder: "Product Name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 70,
      },
      valid: false,
      touched: false,
    },
    category: {
      elementType: "input",
      elementConfig: {
        type: "category",
        placeholder: "Category",
      },
      value: [],
      validation: {
        requiredList: true,
        minLength: 1,
        maxLength: 10,
      },
      valid: false,
      touched: false,
    },
    price: {
      elementType: "input",
      elementConfig: {
        type: "price",
        placeholder: "Starting Price",
      },
      value: "",
      validation: {
        required: true,
        minPrice: 10,
        maxPrice: 10_000_000,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "description",
        placeholder: "Description",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 1000,
      },
      valid: false,
      touched: false,
    },
    images: {
      elementType: "input",
      elementConfig: {
        type: "images",
        placeholder: "upload",
      },
      value: [],
      validation: {
        requiredList: true,
        minLength: 1,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    date: {
      elementType: "input",
      elementConfig: {
        type: "date",
        placeholder: "Closing Date",
      },
      value: null,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const handleDelete = (i: any) => {
    const updatedcontrols = cloneDeep(controls);
    updatedcontrols.category.value = updatedcontrols.category.value.filter(
      (category, index) => index !== i
    );
    updatedcontrols.category.valid = checkValidity(
      updatedcontrols.category.value,
      controls.category.validation
    );
    updatedcontrols.category.touched = true;
    setControls(updatedcontrols);
  };

  const handleAddition = (category: any) => {
    const updatedcontrols = cloneDeep(controls);
    updatedcontrols.category.value = [
      ...updatedcontrols.category.value,
      category,
    ];
    updatedcontrols.category.valid = checkValidity(
      updatedcontrols.category.value,
      controls.category.validation
    );
    updatedcontrols.category.touched = true;
    setControls(updatedcontrols);
  };

  const handleDrag = (category: any, currPos: any, newPos: any) => {
    const updatedcontrols = cloneDeep(controls);
    updatedcontrols.category.value = updatedcontrols.category.value.slice();
    updatedcontrols.category.value.splice(currPos, 1);
    updatedcontrols.category.value.splice(newPos, 0, category);
    updatedcontrols.category.valid = checkValidity(
      updatedcontrols.category.value,
      controls.category.validation
    );
    updatedcontrols.category.touched = true;
    setControls(updatedcontrols);
  };

  const changedInputHandler = React.useCallback(
    (
      event: any,
      elementIdentifer: "name" | "date" | "price" | "images" | "description"
    ) => {
      const updatedcontrols = cloneDeep(controls);
      if (elementIdentifer === "images") {
        updatedcontrols[elementIdentifer].value = event;
        updatedcontrols[elementIdentifer].valid = checkValidity(
          event,
          controls[elementIdentifer].validation
        );
      } else {
        updatedcontrols[elementIdentifer].value = (
          event.target as HTMLInputElement
        ).value;
        updatedcontrols[elementIdentifer].valid = checkValidity(
          (event.target as HTMLInputElement).value,
          controls[elementIdentifer].validation
        );
      }
      updatedcontrols[elementIdentifer].touched = true;
      setControls(updatedcontrols);
    },
    [controls]
  );

  const addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = controls.name.value;
    const category = controls.category.value;
    const price = controls.price.value;
    const description = controls.description.value;
    const images = controls.images.value;
    const date = valueDate;

    if (
      name &&
      category &&
      price &&
      description &&
      images &&
      date !== ("" || null || undefined)
    ) {
      const data = {
        name: name,
        categories: category,
        startingPrice: price,
        description: description,
        images: images,
        closingDate: date,
      };
      for (let index = 0; index < data.categories.length; index++) {
        data.categories[index] = { category: data.categories[index].text };
      }
      dispatch(createProduct(data));
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      // console.log(acceptedFiles);

      if (acceptedFiles.length > 0) {
        // setOpenAlert(false);
        // setImg(URL.createObjectURL(acceptedFiles[0]));
        // setImgURL(acceptedFiles[0]);
        changedInputHandler(acceptedFiles, "images");
        if (acceptedFiles[0].size > 2097152) {
          // setDisabled(true);
          // setOpenAlert(true);
        }
      }
    },
    [changedInputHandler]
  );
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] }, maxFiles: 6, onDrop });

  const style: any = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const clearFormHandler = () => {
    while (acceptedFiles.length > 0) {
      acceptedFiles.pop();
    }
    setValueDate(null);
    setControls({
      name: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Product Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 70,
        },
        valid: false,
        touched: false,
      },
      category: {
        elementType: "input",
        elementConfig: {
          type: "category",
          placeholder: "Category",
        },
        value: [],
        validation: {
          requiredList: true,
          minLength: 1,
          maxLength: 10,
        },
        valid: false,
        touched: false,
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "price",
          placeholder: "Starting Price",
        },
        value: "",
        validation: {
          required: true,
          minPrice: 10,
          maxPrice: 10_000_000,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "description",
          placeholder: "Description",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 1000,
        },
        valid: false,
        touched: false,
      },
      images: {
        elementType: "input",
        elementConfig: {
          type: "images",
          placeholder: "upload",
        },
        value: [],
        validation: {
          requiredList: true,
          minLength: 1,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      date: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Closing Date",
        },
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <h2>Add Product</h2>
      <form onSubmit={addProduct}>
        <Card sx={{ minWidth: 275 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: "#05172e" }}
                >
                  Details
                </Typography>

                <TextField
                  className="inputsForm prodName"
                  id="outlined-basic"
                  label="Product Name"
                  variant="outlined"
                  name="title"
                  required
                  fullWidth
                  autoFocus
                  value={controls.name.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "name")
                  }
                  color={
                    !controls.name.valid && controls.name.touched
                      ? "secondary"
                      : "primary"
                  }
                />
                <p
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontSize: "13px",
                    textTransform: "capitalize",
                    color: "rgb(94, 93, 93)",
                  }}
                >
                  do not exceed 70 characters when entering the product name
                </p>
                <ReactTags
                  tags={controls.category.value}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  inputFieldPosition="bottom"
                  placeholder="Category *"
                  autocomplete
                  autofocus={false}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    textTransform: "capitalize",
                    color: "rgb(94, 93, 93)",
                  }}
                >
                  you have to add Comma " , " or Press Enter after every word .
                </p>
                <TextField
                  label="Starting Price"
                  className="inputsForm"
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  value={controls.price.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "price")
                  }
                  color={
                    !controls.price.valid && controls.price.touched
                      ? "secondary"
                      : "primary"
                  }
                />
                <TextField
                  className="inputsForm prodName"
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={controls.description.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "description")
                  }
                  color={
                    !controls.description.valid && controls.description.touched
                      ? "secondary"
                      : "primary"
                  }
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    textTransform: "capitalize",
                    color: "rgb(94, 93, 93)",
                  }}
                >
                  do not exceed 1000 characters when entering the product
                  Description
                </p>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: "#05172e" }}
                >
                  Product Images
                </Typography>
                <section className="dropzone">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <AddPhotoAlternateOutlinedIcon
                      style={{
                        fontSize: "3rem",
                        filter: " drop-shadow(0px 0px 8px)",
                      }}
                    />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      marginTop: "5px",
                      fontSize: "13px",
                      textTransform: "capitalize",
                      color: "rgb(94, 93, 93)",
                    }}
                  >
                    you need to add at least 3 images. pay attention to the
                    quality of the pictures you add, comply with the background
                    color standards. pictures must be in certain dimensions.
                    Notice that the product shows all the details.
                  </p>
                  <aside>
                    <ImageList
                      sx={{ width: "100%" }}
                      cols={acceptedFiles.length}
                      rowHeight={164}
                    >
                      {acceptedFiles.map((item) => (
                        <ImageListItem key={item.name}>
                          <img
                            src={URL.createObjectURL(item)}
                            srcSet={URL.createObjectURL(item)}
                            alt={item.name}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </aside>
                </section>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        className="inputsForm"
                        name="date"
                        fullWidth
                        required
                        {...props}
                      />
                    )}
                    label="Closing Date"
                    value={valueDate}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    minDate={new Date(new Date().getTime() + 172800000)}
                    maxDate={new Date(new Date().getTime() + 2.628e9)}
                  />
                </LocalizationProvider>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Stack spacing={2} direction="row">
                  <Button
                    size="large"
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Add Product
                  </Button>
                  <Button
                    size="large"
                    onClick={clearFormHandler}
                    fullWidth
                    variant="outlined"
                  >
                    Clear Form
                  </Button>
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </form>
    </ThemeProvider>
  );
};
export default AddProduct;
