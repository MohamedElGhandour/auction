import React from "react";
import Grid from "@mui/material/Grid";
import Card from "../../components/Card/index";
// import Swiper from "../../containers/Swiper/index";
import { fetchProducts, updatePageCount } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(updatePageCount(value));
    dispatch(fetchProducts());
  };
  const products = useSelector((state: any) => state.products.products);
  const countProducts = useSelector((state: any) => state.products.count);

  React.useEffect(() => {
    dispatch(updatePageCount(1));
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
              image={product.images[0].image}
              closingDate={product.closingDate}
              price={product.livePrice}
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
export default Home;
