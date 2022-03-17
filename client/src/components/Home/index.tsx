import React from "react";
import Layout from "../../layout/index";
import Grid from "@mui/material/Grid";
import Card from "../Card/index";
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
    <Layout>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product: any) => (
          <Grid item xs={2} sm={4} md={4} key={product._id}>
            <Card
              name={product.name}
              image={product.image}
              price={product.startingPrice}
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
    </Layout>
  );
};
export default Home;
