import React from "react";
import Grid from "@mui/material/Grid";
import CardComp from "../../components/Card/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Swiper from "../../containers/Swiper/index";
import { updatePageCount, searchProducts } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [inputSearch, setinputSearch] = React.useState("");
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(updatePageCount(value));
    // dispatch(fetchProducts());
  };
  const products = useSelector((state: any) => state.products.search);
  const countProducts = useSelector((state: any) => state.products.count);

  const handleSearch = (event: any) => {
    event.preventDefault();
    dispatch(searchProducts(inputSearch));
    console.log(inputSearch);
  };

  React.useEffect(() => {
    document.title = "Auction | Search";
    if (products && products.length > 0)
      document.title = "Auction | " + inputSearch || "Auction";
    dispatch(updatePageCount(1));
  }, [dispatch, inputSearch, products]);
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Search
              </Typography>
              <Paper
                component="form"
                onSubmit={handleSearch}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  boxShadow:
                    " 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%), 0px -2px 3px 0px rgb(0 0 0 / 15%)",
                  marginTop: "15px",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                  value={inputSearch}
                  onChange={(e) => {
                    setinputSearch(e.target.value);
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        {products.map((product: any) => (
          <Grid item sm={12} md={6} lg={4} key={product._id}>
            <CardComp
              name={product.name}
              image={product.images[0].image}
              price={product.livePrice}
              closingDate={product.closingDate}
              id={product._id}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        {products && products.length > 0 && (
          <Pagination
            count={countProducts}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        )}
      </Grid>
    </>
  );
};
export default Search;
