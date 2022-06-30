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
import Tooltip from "@mui/material/Tooltip";
import numeral from "numeral";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const Wallet = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
                <Tooltip title={`${currencyAmount} $`}>
                  <span>{numeral(currencyAmount).format("($ 0.00 a)")}</span>
                </Tooltip>
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
              {/* <Typography variant="caption">Details</Typography> */}
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  marginTop: "15px",
                  boxShadow:
                    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%), 0px -2px 3px 0px rgb(0 0 0 / 15%)",
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Wallet;
