import express, { Request, Response, Router } from "express"

const router = express.Router()

router.post('/', (req:Request, res:Response)=>{
    console.log('object');
})


export const reviewRoute = router;