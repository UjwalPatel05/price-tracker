"use server"

import { revalidatePath } from "next/cache";
import { Product } from "../model/product.model";
import { connectToDatabase } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { User } from "@/types";

export async function scrapeAndStoreProduct(url: string) {
  if(!url) return;

  try {

    await connectToDatabase();

    const scrapedProduct = await scrapeAmazonProduct(url);

    if(!scrapedProduct) return;

    // store the product in the database
    let product = scrapedProduct;

    const existingProduct = await Product.findOne({url:scrapedProduct.url});
    

    if(existingProduct){
        //update the product

        const updatedPriceHistory = [...existingProduct.priceHistory, {date:Date.now(),price:scrapedProduct.currentPrice}];
        product = {
            ...scrapedProduct,
            lowestPrice:getLowestPrice(updatedPriceHistory),
            highestPrice:getHighestPrice(updatedPriceHistory),
            averagePrice:getAveragePrice(updatedPriceHistory),
            priceHistory:updatedPriceHistory
        }

    }

    console.log("Product Before Saving",product);
    

    const newProduct = await Product.findOneAndUpdate({productUrl:url},product,{new:true,upsert:true});

    revalidatePath(`/products/${newProduct._id}`);





  } catch (error: any) {
    throw new Error(`failed to scrape the product : ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);
    
    if(!product) return null;

    return product;
  } catch (error: any) {
    throw new Error(`failed to get product : ${error.message}`);
  }
}

export async function getAllProducts() {
  try {
    await connectToDatabase();

    const products = await Product.find({});

    return products;
  } catch (error: any) {
    throw new Error(`failed to get products : ${error.message}`);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    await connectToDatabase();

    const currentProduct = await Product.findById(productId);

    if(!currentProduct) return null;

    const similarProducts = await Product.find({
      _id:{$ne:productId},
    }).limit(3);

    return similarProducts;

  } catch (error: any) {
    throw new Error(`failed to get products : ${error.message}`);
  }
}

// export async function addUserEmailToProduct(productId: string, email: string) {
//   try {
//     await connectToDatabase();

//     const product = await Product.findById(productId);
//     console.log(product);
    
//     if(!product) return;

//     const existingUser = product.users.some((user:User )=> user.email === email);

//     if(!existingUser) {
//       product.users.push({email});
//       await product.save();
//       const emailContent = await generateEmailBody(product, "WELCOME");
//       await sendEmail(emailContent, [email]);
//     }

//   } catch (error: any) {
//     throw new Error(`failed to get products : ${error.message}`);
//   }
// }

export async function addUserEmailToProduct(productId: string, userEmail: string) {
 
  try {
    const product = await Product.findById(productId);
 
    
    if(!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if(!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}