import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productUrl:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    currentPrice:{type:Number,required:true},
    originalPrice:{type:Number,required:true},
    currency:{type:String,required:true},
    discountRate:{type:Number,required:true},
    outOfStock:{type:Boolean,required:true},
    image:{type:String,required:true},
    priceHistory:[{
        date:{type:Date,required:true},
        price:{type:Number,required:true}
    }],
    reviewsCount:{type:Number,required:true},
    stars:{type:Number,required:true},
    lowestPrice:{type:Number},
    highestPrice:{type:Number},
    averagePrice:{type:Number},
    users:[
        {
        email:{type:String,required:true},
    }]
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema) ;