const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const sessionMiddleware = require('./modules/session-middleware');

// const squareRouter = require('./routes/square.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
// app.use(sessionMiddleware);
// app.use('/api/user', userRouter);
app.use(express.static('build'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
  