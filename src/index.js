const express = require("express");
const app = express();

const PORT = 8000;

app.use(express.json());

const signInRouter = require("./routers/signIn");
const usersRouter = require("./routers/users");

app.use("/users", usersRouter);
app.use("/signIn", signInRouter);

// app.get("/", async (req, res, next) => {
//   try {
//     const challenge = req.query["hub.challenge"];

//     if (challenge) {
//       return res.send(challenge);
//     } else {
//       return res.send("Error: Missing hub.challenge");
//     }
//   } catch (error) {
//     console.log({ error });
//   }
// });

// app.post("/", async (req, res, next) => {
//   try {
//     // const keys = Object.keys(req);

//     console.log(req.body.entry[0]);
//     // const { sender, recipient, timestamp, message } =
//     //   req.body.entry[0].messaging[0];
//     // console.log({ sender, recipient, timestamp, message });
//     res.send();
//   } catch (error) {
//     console.log({ error });
//   }
// });

app.use((error, req, res, next) => {
  error.response ? console.log(error.message) : console.log({ error });
  error.errorMessage ? "" : (error.errorMessage = error.message);

  const errorObj = {
    status: "Error",
    message: error.errorMessage,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(PORT, async (error) => {
  if (error) {
    console.log(`ERROR: ${error}`);
  } else {
    console.log(`SERVER RUNNING at ${PORT} ✅`);
  }
});
