import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NumberFormat from "react-number-format";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { fetchProduct, sendBid } from "../../../store/actions/index";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import Tooltip from "@mui/material/Tooltip";
import numeral from "numeral";
import StarRateIcon from "@mui/icons-material/StarRate";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface State {
  numberformat: string;
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: string, stats: number) {
  return { name, stats };
}

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [values, setValues] = useState<State>({
    numberformat: "",
  });
  const [mainImage, setMainImage] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const product = useSelector((state: any) => state.products.product);

  const myId =
    useSelector((state: any) => state.auth.id) ||
    localStorage.getItem("userId");

  useEffect(() => {
    document.title = "Auction | ... .";
    if (product) {
      document.title = "Auction | " + product.name || "Auction";
      if (mainImage === "") setMainImage(product.images[0].image);
      const closingDate = new Date(product.closingDate).getTime();
      const currentDate = new Date().getTime();
      // Find the distance between now and the count down date
      const distance = closingDate - currentDate;
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours =
        days * 24 +
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    } else {
      setMainImage("");
    }

    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [product, seconds, minutes, hours, mainImage]);
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((preValues) => ({
      ...preValues,
      [event.target.name]: event.target.value,
    }));
  };

  const zoom = (e: any) => {
    const zoomer = e.currentTarget;
    const rect = zoomer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  };

  const onBidHandler = () => {
    const data = {
      product: product._id,
      price: values.numberformat,
    };
    dispatch(sendBid(data));
    handleClose();
    setValues({
      numberformat: "",
    });
  };

  const numberOfBidders = (bids: any) => {
    let numberOfBidders = [];
    bids.forEach((bid) => {
      if (!numberOfBidders.includes(bid!.owner._id))
        numberOfBidders.push(bid!.owner._id);
    });
    return numberOfBidders.length;
  };

  const rows = [
    createData(
      "number of bidders",
      product ? numberOfBidders(product.bids) : 0
    ),
    createData("number of bidding", product ? product.bids.length : 0),
    createData("Views", product ? product.views : 0),
    createData(
      "Starting Price",
      product ? numeral(product.startingPrice).format("($ 0.00 a)") : 0
    ),
    createData(
      "Current Bid",
      product
        ? numeral(
            product.livePrice === product.startingPrice ? 0 : product.livePrice
          ).format("($ 0.00 a)")
        : 0
    ),
    createData(
      "over base",
      product
        ? numeral(product.livePrice - product.startingPrice).format(
            "($ 0.00 a)"
          )
        : 0
    ),
  ];

  return (
    product && (
      <>
        <h2>{product.name}</h2>
        <Grid container spacing={2}>
          <Grid item sm={12} md={7}>
            {/* <img
              alt={product.name}
              src={product.images[0].image}
              width="100%"
            /> */}
            <figure
              className="zoom"
              // onmousemove="zoom(event)"
              onMouseMove={zoom}
              style={{ backgroundImage: `url(${mainImage})` }}
            >
              <img alt={product.name} src={mainImage} />
            </figure>
            {product.images.length > 1 && (
              <ImageList
                sx={{ width: "100%" }}
                cols={product.images.length}
                rowHeight={164}
                style={{ overflow: "hidden" }}
              >
                {product.images.map((image) => (
                  <ImageListItem
                    key={image.image}
                    onClick={() => setMainImage(image.image)}
                  >
                    <img
                      src={image.image}
                      srcSet={image.image}
                      alt={image.name}
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mt: 3 }}
                  component="div"
                >
                  Current Bid
                </Typography>
                <Tooltip title={`${product.livePrice} $`}>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}
                    component="div"
                  >
                    {numeral(product.livePrice).format("($ 0.00 a)")}
                  </Typography>
                </Tooltip>
                {new Date(product.closingDate).getTime() >
                new Date().getTime() ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center", mt: 4 }}
                      component="div"
                    >
                      Bid ending in
                    </Typography>
                    <Grid container>
                      <Grid item xs>
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          {hours}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          Hours
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          {minutes}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          Mins
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          {seconds}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ textAlign: "center" }}
                          component="div"
                        >
                          Secs
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mt: 4 }}
                    component="div"
                  >
                    Auction is over
                  </Typography>
                )}
                {!(myId === product.owner._id) && (
                  <>
                    <Button
                      variant="contained"
                      sx={{
                        display: "block",
                        width: "-webkit-fill-available",
                        margin: "15px 20px",
                      }}
                      onClick={handleOpen}
                    >
                      Bid Now
                    </Button>
                    {/* <Button
                      variant="outlined"
                      sx={{
                        display: "block",
                        width: "-webkit-fill-available",
                        margin: "15px 20px",
                      }}
                    >
                      Outlined
                    </Button> */}
                  </>
                )}
                {!(myId === product.owner._id) && (
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Grid sx={style} container>
                        <Grid item xs={4}>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundImage: `url(${product.images[0].image})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </Grid>
                        <Grid item xs={8}>
                          <Box sx={{ p: 4 }}>
                            <Typography
                              id="transition-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Bid a place
                            </Typography>
                            <Typography
                              id="transition-modal-description"
                              variant="body2"
                              sx={{ mt: 2 }}
                            >
                              Remember that to participate in this auction, this
                              transaction cannot be undone, which will be
                              deducted from your e-wallet (you will get your
                              money back if you do not win the auction)
                            </Typography>
                            <Grid container alignItems="end" spacing={1}>
                              <Grid item>
                                {" "}
                                <TextField
                                  label="Enter Cash"
                                  value={values.numberformat}
                                  onChange={handleChange}
                                  name="numberformat"
                                  id="formatted-numberformat-input"
                                  InputProps={{
                                    inputComponent: NumberFormatCustom as any,
                                  }}
                                  autoComplete="false"
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px 15px",
                                  }}
                                  onClick={onBidHandler}
                                >
                                  Bid
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Fade>
                  </Modal>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Details
                </Typography>
                <Typography variant="caption">Description</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ minWidth: 275 }}>
              {myId === product.owner._id ? (
                <CardContent>
                  <Typography variant="h5" component="div">
                    Top Bider
                  </Typography>
                  {product.bids.length > 0 ? (
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {product.bids.map((bid: any) => (
                        <React.Fragment key={bid._id}>
                          <ListItem
                            alignItems="flex-start"
                            style={
                              bid.price === product.livePrice
                                ? {
                                    border: "1px solid rgba(25, 118, 210)",
                                    color: "#1976d2",
                                    borderRadius: "4px",
                                  }
                                : { color: "inherit" }
                            }
                          >
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={bid.owner.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  {bid.owner.name}{" "}
                                  {bid.price === product.livePrice && (
                                    <StarRateIcon
                                      style={{ fontSize: "0.875rem" }}
                                    />
                                  )}
                                </React.Fragment>
                              }
                              secondary={
                                <React.Fragment>
                                  <Moment fromNow>{bid.createdAt}</Moment>
                                </React.Fragment>
                              }
                            />
                            <Tooltip title={`${product.livePrice} $`}>
                              <Typography
                                variant="h6"
                                sx={{ pt: "14px" }}
                                component="div"
                              >
                                {numeral(bid.price).format("($ 0.00 a)")}
                              </Typography>
                            </Tooltip>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <p style={{ textAlign: "center" }}>No One Yet</p>
                  )}
                </CardContent>
              ) : (
                <CardContent>
                  <Typography variant="h5" component="div">
                    My Bid
                  </Typography>
                  {product.bids.length > 0 ? (
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {product.bids.map((bid: any) =>
                        bid.owner._id === myId ? (
                          <React.Fragment key={bid._id}>
                            <ListItem
                              alignItems="flex-start"
                              style={
                                bid.price === product.livePrice
                                  ? {
                                      border: "1px solid rgba(25, 118, 210)",
                                      color: "#1976d2",
                                      borderRadius: "4px",
                                    }
                                  : { color: "inherit" }
                              }
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={bid.owner.avatar}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    {bid.owner.name}{" "}
                                    {bid.price === product.livePrice && (
                                      <StarRateIcon
                                        style={{ fontSize: "0.875rem" }}
                                      />
                                    )}
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Moment fromNow>{bid.createdAt}</Moment>
                                  </React.Fragment>
                                }
                              />
                              <Tooltip title={`${product.livePrice} $`}>
                                <Typography
                                  variant="h6"
                                  sx={{ pt: "14px" }}
                                  component="div"
                                >
                                  {numeral(bid.price).format("($ 0.00 a)")}
                                </Typography>
                              </Tooltip>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </React.Fragment>
                        ) : null
                      )}
                    </List>
                  ) : (
                    <p style={{ textAlign: "center" }}>No One Yet</p>
                  )}
                </CardContent>
              )}
            </Card>
          </Grid>
          {myId === product.owner._id && (
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Statistics
                  </Typography>
                  <Typography variant="caption">Details</Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name Of Stats</StyledTableCell>
                          <StyledTableCell align="center">
                            Stats
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.stats}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </>
    )
  );
};
export default Product;
