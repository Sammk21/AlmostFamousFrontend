import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const paragraphh =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et aperiam, doloribus quaerat tenetur consectetur, accusantium provident cum sint vero odio, incidunt suscipit obcaecati iusto."

  return (
    <div className="flex sm:pt-32 pt-20 flex-col  small:items-start py-6 content-container">
      <div className="w-full  text-[12vw] sm:text-[7vw] lg:text-[5vw] font-medium flex-col  border-b">
        <h1 className="font-medium  text-gray-900">{collection.title}</h1>
        <div className="mx-auto my-4 flex justify-center flex-col">
          <p className="md:w-[40vw] w-[70vw]  text-sm text-gray-700">
            {paragraphh}
          </p>
        </div>
      </div>
      <div className="w-full  ">
        <RefinementList sortBy={sortBy || "created_at"} />
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
