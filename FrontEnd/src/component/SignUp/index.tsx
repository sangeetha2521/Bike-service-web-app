import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "state/store";
import { signUpUserLoading } from "state/Auth/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const location = useLocation();
  const user: any = useAppSelector((state) => state.AuthSlice);
  const isAdminPath = location.pathname.includes("admin");
  const role = isAdminPath ? "admin" : "user";
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // {
  //     criteriaMode: "all",
  //     resolver: async (data) => {
  //       return {
  //         values: data,
  //         errors: {
  //           email: /^\S+@\S+$/.test(data.email) ? null : "Invalid email address",
  //         },
  //       };
  //     },
  //   });
  const [Error, setError] = useState(Boolean);
  const emailWatchFields = watch("email");
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    if (emailWatchFields) {
      if (emailRegex.test(emailWatchFields)) {
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [emailWatchFields]);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const onSubmit = (data) => {
    data.role = role;
    const result = dispatch(signUpUserLoading(data));
  };
  useEffect(() => {
    if (user.isAuthenticated && user.user.message == "sucess") {
      mutate("/services");
      Navigate("/");
    }
  }, [user.isAuthenticated, user.user.message]);
  useEffect(() => {
    if (user.error.includes(401)) {
      toast.error("User already exists please login ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [user.error]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
              />
              {Error && <p style={{ color: "red" }}>Invalid email</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="number"
                id="phoneNumber"
                autoComplete=""
                {...register("phoneNumber")}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" style={{ color: "#FF6B6B" }} className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
