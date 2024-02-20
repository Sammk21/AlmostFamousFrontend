import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="flex sm:pt-32 pt-20 flex-col  small:items-start py-6 content-container">
      <div className="w-full  text-[12vw] sm:text-[7vw] lg:text-[5vw] font-medium flex-col  border-b">
        <h1 className="font-medium  text-gray-900">All Products</h1>
      </div>
      <div className="w-full ">
        <RefinementList sortBy={sortBy || "created_at"} />
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
