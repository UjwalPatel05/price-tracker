import { Product } from "@/lib/model/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export const maxDuration = 5; // 5 minutes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find({});

    if (!products) throw new Error("No products found");

    // 1. SCRAPE LATEST DATA OF THE PRODUCT AND UPDATE

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(
          currentProduct.productUrl
        );

        if (!scrapedProduct) throw new Error("Error scraping product");

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { date: Date.now(), price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
          priceHistory: updatedPriceHistory,
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { productUrl: currentProduct.productUrl },
          product
        );

        // 2. CHECK PRODUCT STATUS AND SEND EMAILS IF REQUIRED

        const emailNotificationType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotificationType && currentProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(
            productInfo,
            emailNotificationType
          );

          const sendTo = currentProduct.users.map((user: any) => user.email);

          await sendEmail(emailContent, sendTo);
        }
      })
    );

    return NextResponse.json({
      message: "OK",
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Error in GET: ${error}`);
  }
}
