import express, { Application } from "express"
import { reviewRoute } from "./modules/reviews/review.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
const app: Application = express();
app.use(express.json());

app.use(cors({
    origin:process.env.APP_URL || "http://localhost:3000"
}))

app.get('/', (req,res)=>{
    res.send("server is running...")
})

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use('/api/v1/review', reviewRoute)

export default app; 