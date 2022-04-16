import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Grid from "@mui/material/Grid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddCardIcon from "@mui/icons-material/AddCard";
import Logo from "../../assets/images/logoAvatar.svg";
import NumberFormat from "react-number-format";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addPayment } from "../../store/actions/index";

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

const CssTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-root:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-root": {
    color: "white",
    borderColor: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const Wallet = () => {
  const [values, setValues] = useState<State>({
    numberformat: "",
  });
  const [stripeToken, setStripeToken] = useState<any>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (stripeToken?.id) {
      const data = {
        amount: +values.numberformat,
        tokenId: stripeToken!.id,
      };
      dispatch(addPayment(data));
      setStripeToken(null);
      setValues({
        numberformat: "",
      });
    }
  }, [dispatch, stripeToken, values]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((preValues) => ({
      ...preValues,
      [event.target.name]: event.target.value,
    }));
  };
  const name =
    useSelector((state: any) => state.auth.name) ||
    localStorage.getItem("name");

  const currencyAmount =
    useSelector((state: any) => state.auth.currencyAmount) ||
    localStorage.getItem("currencyAmount");

  const type =
    useSelector((state: any) => state.auth.type) ||
    localStorage.getItem("type");

  const stripeKey = process.env.REACT_APP_STRIPE_KEY as string;

  const onToken = (token: any) => setStripeToken(token);

  return (
    <>
      <h2>
        Wallet{" "}
        <AccountBalanceWalletIcon
          sx={{ fontSize: "2rem", position: "relative", top: "5px" }}
        />
      </h2>
      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {/* <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography> */}
              <Typography variant="h5" component="div">
                Welcome, {name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {type === "Client" ? (
                  <PersonIcon sx={{ position: "relative", top: "4px" }} />
                ) : (
                  <ApartmentIcon sx={{ position: "relative", top: "4px" }} />
                )}
                {type}
              </Typography>
              <Typography variant="body2">
                We remind you that once you create an account on our platform
                that you agree to our policy, we maintain the confidentiality of
                your data and privacy, you can check the{" "}
                <Button size="small">Q&N</Button> section, we wish you a
                pleasant experience.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card
            sx={{
              minWidth: 275,
              background:
                "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(2,48,107,1) 0%, rgba(0,212,255,1) 100%)",
              color: "#fff",
              height: "224.55px",
              padding: 1,
              paddingTop: 1.5,
              position: "relative",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Current Balance
              </Typography>
              <Typography variant="h6">
                {currencyAmount} <small>$</small>
              </Typography>

              <CssTextField
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
                sx={{ display: "block", color: "white" }}
              />
              <StripeCheckout
                name="Auction System"
                billingAddress
                description={`total is ${values.numberformat}`}
                amount={+values.numberformat}
                token={onToken}
                currency="USD"
                stripeKey={stripeKey}
                image={Logo}
              >
                <Button
                  size="small"
                  sx={{
                    background: "#fff",
                    color: "#000",
                    padding: "4px 15px",
                    "&:hover": {
                      background: "#cdcdcd",
                    },
                    mt: "8px",
                  }}
                >
                  Recharge
                </Button>
              </StripeCheckout>
            </CardContent>
            <AddCardIcon
              sx={{
                position: "absolute",
                bottom: "-15px",
                right: 0,
                fontSize: "10rem",
                opacity: 0.6,
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Details
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Wallet;
