import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {

  const products = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="arrow"
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> Price Tracker</span>
            </h1>

            <p className="mt-6">
                Powerful, easy to use price tracker for your favorite products.
            </p>

            <SearchBar/>
          </div>

          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
            {products?.map((product, index) => (
              <ProductCard key={product._id} product={product}/>
            ))}
        </div>
      </section>
    </>
  );
}
