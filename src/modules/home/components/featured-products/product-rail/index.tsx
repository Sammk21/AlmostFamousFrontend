import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import { ProductCollectionWithPreviews } from "types/global"
import Slider from "../slider/index"
import { retrievePricedProductById } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container pb-6">
      <div className="flex justify-between sm:mb-11  py-7   lg:py-11">
        <Text className="text-[12vw] sm:text-[7vw] lg:text-[5vw] font-medium text-gray-900">
          {collection.title}
        </Text>

        <LocalizedClientLink
          className="text-xs sm:text-sm lg:text-base text-ui-fg-interactive font-semibold lg:font-normal text-center"
          href={`/collections/${collection.handle}`}
        >
          View all
        </LocalizedClientLink>
      </div>
      {/* <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-10 small:gap-y-36">
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
      </ul> */}
      <Slider products={products} region={region} />
    </div>
  )
}
