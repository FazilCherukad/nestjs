const Razorpay = require('razorpay')

export const RAZORPAY_KEY_ID = ""
export const RAZORPAY_KEY_SECRET = ""

export const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
})