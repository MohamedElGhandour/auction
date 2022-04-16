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
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { fetchProduct, sendBid } from "../../store/actions/index";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

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

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [values, setValues] = useState<State>({
    numberformat: "",
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const product = useSelector((state: any) => state.auth.product);

  useEffect(() => {
    if (product) {
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
  }, [product, seconds, minutes, hours]);
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((preValues) => ({
      ...preValues,
      [event.target.name]: event.target.value,
    }));
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
  return (
    product && (
      <>
        <h2>{product.name}</h2>
        <Grid container spacing={2}>
          <Grid item sm={12} md={7}>
            <img alt={product.name} src={product.image} width="100%" />
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
                <Typography
                  variant="h3"
                  sx={{ textAlign: "center" }}
                  component="div"
                >
                  <NumberFormat
                    value={product.livePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Typography>
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
                <Button
                  variant="outlined"
                  sx={{
                    display: "block",
                    width: "-webkit-fill-available",
                    margin: "15px 20px",
                  }}
                >
                  Outlined
                </Button>
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
                            backgroundImage: `url(${product.image})`,
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
                            Remember that to participate in this auction, you
                            must pay the auction insurance fee, which is 20% of
                            the starting price of the auction{" "}
                            <small>"will not apply for now"</small>
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
              <CardContent>
                <Typography variant="h5" component="div">
                  Top Bider
                </Typography>
                {product.bids.length > 0 ? (
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {product.bids.map((bid: any) => (
                      <React.Fragment key={bid._id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={bid.owner.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={bid.owner.name}
                            secondary={
                              <React.Fragment>
                                <Moment fromNow>{bid.createdAt}</Moment>
                              </React.Fragment>
                            }
                          />
                          <Typography
                            variant="h6"
                            sx={{ pt: "14px" }}
                            component="div"
                          >
                            <NumberFormat
                              value={bid.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"$"}
                            />
                          </Typography>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <p style={{ textAlign: "center" }}>Be the First Bider</p>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  );
};
export default Product;
