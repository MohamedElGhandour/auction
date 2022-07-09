import React from "react";
import Grid from "@mui/material/Grid";
import CardComp from "../../components/Card/index";
import Card from "@mui/material/Card";
import { updatePageCount, fetchProfile } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Profile = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(updatePageCount(value));
    dispatch(fetchProfile());
  };
  const profile = useSelector((state: any) => state.products.profile);
  const products = useSelector((state: any) => state.products.profileProducts);
  const countProducts = useSelector((state: any) => state.products.count);

  console.log(profile);

  React.useEffect(() => {
    dispatch(updatePageCount(1));
    if (!profile.name) dispatch(fetchProfile());
  }, [dispatch, products, profile]);
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          {profile && (
            <Card sx={{ minWidth: 275, textAlign: "center" }}>
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundImage: `url(${profile.avatar})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  margin: "auto",
                  borderRadius: " 50%",
                  boxShadow:
                    " 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%), 0px -2px 3px 0px rgb(0 0 0 / 15%)",
                  marginTop: "20px",
                }}
              ></div>
              <p>
                {profile.type === "Client" ? (
                  <PersonIcon sx={{ position: "relative", top: "4px" }} />
                ) : (
                  <ApartmentIcon sx={{ position: "relative", top: "4px" }} />
                )}
                {profile.name}
              </p>
              <p>{profile.email}</p>
            </Card>
          )}
        </Grid>
        {products.map((product: any) => (
          <Grid item sm={12} md={6} lg={4} key={product._id}>
            <CardComp
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
export default Profile;
