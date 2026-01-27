import express, { Application } from "express"
import { reviewRoute } from "./modules/reviews/review.route";

const app: Application = express();

app.get('/', (req,res)=>{
    res.send("server is running...")
})

app.use('/api/v1/review', reviewRoute)

export default app; 