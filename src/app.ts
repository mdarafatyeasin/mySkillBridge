import express, { Application } from "express"
import { reviewRoute } from "./modules/reviews/review.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorRoutes } from "./modules/TutorProfile/tutor.route";
import { timeSlot } from "./modules/timeSlot/slot.route";
import { categoryRoutes } from "./modules/Category/category.route";
import { bookingRoutes } from "./modules/Booking/booking.route";
const app: Application = express();
app.use(express.json());

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}))

app.get('/', (req, res) => {
    res.send("server is running...")
})

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/tutor', tutorRoutes)
app.use('/api/v1/slot', timeSlot)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/booking', bookingRoutes)

export default app; 