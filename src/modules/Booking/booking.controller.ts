import { Request, Response } from "express"
import { bookingService } from "./booking.service"
import { success } from "better-auth"

const createBooking = async (req:Request, res:Response) =>{
    try{
        
        const result = await bookingService.createBooking()
        res.status(200).json({
            success:true,
            message: "booking success",
            data: result
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "booking failed",
            error: err
        })
    }
}