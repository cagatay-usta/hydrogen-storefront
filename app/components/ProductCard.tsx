import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import type {PartialDeep} from 'type-fest';

interface Product {
  id: string;
  title: string;
  handle: string;
  imageSrc: string;
  variants?: {
    nodes?: {
      price?: {
        amount: number;
      };
      compareAtPrice?: {
        amount: number;
      };
      image: PartialDeep<
        ImageType,
        {
          recurseIntoArrays: true;
        }
      >;
    }[];
  };
}

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({product}: ProductCardProps) {
  const {price, compareAtPrice} = product.variants?.nodes?.[0] || {};
  const isDiscounted =
    price?.amount !== undefined &&
    compareAtPrice?.amount !== undefined &&
    compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <div className="absolute top-0 right-0 m-4 text-roght text-notice text-red-600 text-xs">
              Sale
            </div>
          )}
          <Image
            data={product.variants?.nodes?.[0].image}
            alt={product.title}
          />
        </div>
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
