import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blogs.route.js";

const app = express();

// the frontend runs on a different origin (localhost:3000 vs this server's
// localhost:5000), so without CORS the browser blocks every request before
// it reaches any route below - this has to come before everything else
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // parse JSON request body

// uploaded profile images are written to /uploads/profile-images on disk
// (see middlewares/upload.middleware.js) and served back from this same
// static path, so a stored profileImage URL like /uploads/profile-images/x.jpg
// resolves directly
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// nothing above matched, so the path does not exist. the method and the raw
// url are echoed back because "route not found" alone cannot tell a wrong
// path apart from a right path reached with the wrong method
app.use((req, res) => {
    res.status(404).json({
        message: "route not found",
        method: req.method,
        path: req.originalUrl,
    })
});

// express hands any error thrown in a handler here. four arguments is what
// marks this as an error handler, so `next` must stay even though it is unused
app.use((err, req, res, next) => {
    // express.json() rejects a body it cannot parse before any route runs, so
    // that failure arrives here rather than in a controller. it is bad input,
    // not a server fault, and 500 would blame the wrong side
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "request body is not valid JSON" })
    }

    // multer (profile image upload) rejects an oversized or wrong-type file by
    // calling next(err) itself, before any controller runs - also bad input,
    // not a server fault
    if (err.name === "MulterError" || /only .* images are allowed/i.test(err.message || "")) {
        return res.status(400).json({ message: err.message })
    }

    // the stack goes to the log, never to the client: a parser path or a sql
    // string in a response would tell a caller how the server is built
    console.error(err)
    res.status(500).json({ message: "something went wrong" })
});

export default app;
