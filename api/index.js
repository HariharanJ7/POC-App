require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.route');
const protectedRoutes = require('./routes/protected.route');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(morgan('combined')); 

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/protected', protectedRoutes); 

sequelize
    .sync()
    .then(() => {
        console.log('Connected to MySQL!')
    })
    .catch((err) => {
      console.log(err);
        
    });

app.listen(5000, () => {
    console.log('Server running on port 5000')
});
