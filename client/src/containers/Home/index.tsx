import React from "react";
import Grid from "@mui/material/Grid";
import Card from "../../components/Card/index";
// import Swiper from "../../containers/Swiper/index";
import { fetchProducts } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.auth.products);
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product: any) => (
          <Grid item sm={12} md={6} lg={4} key={product._id}>
            <Card
              name={product.name}
              image={product.image}
              price={product.startingPrice}
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
        <Pagination count={10} color="primary" />
      </Grid>
    </>
  );
};
export default Home;
