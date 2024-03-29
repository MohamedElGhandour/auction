import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import numeral from "numeral";
import { NavLink } from "react-router-dom";

interface cardProps {
  name: string;
  image: string;
  price: string;
  id: string;
  closingDate: any;
}

export default function ComplexGrid(props: cardProps) {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    if (props) {
      const closingDate = new Date(props.closingDate).getTime();
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
  }, [props, seconds, minutes, hours]);
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        borderRadius: "15px",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <ButtonBase
            sx={{
              width: 180,
              height: 230,
              backgroundImage: `url(${props.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "15px",
            }}
          ></ButtonBase>
        </Grid>
        <Grid item xs={12} sm>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={1}
            >
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontWeight: 700 }}
                component="h2"
              >
                {props.name}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#eee",
                  padding: "5px",
                  borderRadius: "15px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        Current Bid
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {numeral(props.price).format("($ 0.00 a)")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        Auction Ending In
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {hours} : {minutes} : {seconds}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hrs : Mins : Secs
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <NavLink
                    to={`/product/${props.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined">View</Button>
                  </NavLink>
                  <Button variant="contained">Place a Bid</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Typography variant="subtitle1" component="div">
              HOT
            </Typography>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

// export default function ActionAreaCard() {
//     return (
//       <Card sx={{ maxWidth: 500, borderRadius: "15px" }}>
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="140"
//             image="https://picsum.photos/200/300?random=1"
//             alt="green iguana"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Lizard
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//         </Typography>
//       </Card>
//     );
//   }
