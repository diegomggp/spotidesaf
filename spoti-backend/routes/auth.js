const router = require("express").Router();
const querystring = require("querystring");
const request = require("request");
const clientId = "CLIENT_ID";
const clientSecret = "CLIENT_SECRET";
const redirectUrl = "REDIRECT_URL";

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = () => {
  //router.post("/signin", authControllers.signin());
  //router.post("/signout", authControllers.signout());
  router.get("/login", (req, res) => {
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";
    console.log(redirectUrl);

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: clientId,
          scope: scope,
          redirect_uri: redirectUrl,
          state: state,
        })
    );
  });
  router.get("/callback", (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    console.log("Code: ", code);
    console.log("State: ", state);

    if (state === null) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirectUrl,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token,
            refresh_token = body.refresh_token;

          const options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          request.get(options, (error, response, body) => {
            console.log("body: ", body);
          });

          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  router.get("/refresh_token", (req, res) => {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          access_token: access_token,
        });
      }
    });

    console.log(request);
  });

  return router;
};
