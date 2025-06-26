import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
import restaurantRouter from './routes/restaurant.route.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL ).then(() => {
  console.log('Connected to MongoDB');}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);});


app.use("/restaurant", restaurantRouter);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});