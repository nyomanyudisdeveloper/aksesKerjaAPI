import app from './src/app.js'
import dotenv from "dotenv"
import schedule from 'node-schedule'
import { resetLimitLogin } from './src/model/membership.js';

dotenv.config()

const job = schedule.scheduleJob('0 9 * * 1',async () => {
    const res = await resetLimitLogin()
    console.log("res = ",res)
    console.log('Task executed every Monday 09:00 AM :', new Date());
});

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log("Server is running")
})