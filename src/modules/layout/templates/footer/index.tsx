import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

import {
  FaAmazonPay,
  FaApplePay,
  FaCcVisa,
  FaCreditCard,
  FaGooglePay,
  FaPaypal,
} from "react-icons/fa"
import { SiPaytm } from "react-icons/si"
import { RiCashLine } from "react-icons/ri"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

export default async function Footer() {
  const productCollections = await fetchCollections().then(
    (collections) => collections
  )
  const productCategories = await fetchCategories().then(
    (categories) => categories
  )
  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 sm:flex-row items-start justify-between py-20">
          <div
            data-scroll
            data-scroll-speed="0.2"
            className="left xsmall:text-[9vw] text-[12vw] justify-center sm:py-1 py-1 px-3 tracking-tighter flex sm:flex-col "
          >
            <span className="lg:leading-normal leading-[6rem]">Almost</span>
            <span className="leading-[6rem] sm:pl-12">Famous</span>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 ">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {productCollections && productCollections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (productCollections?.length || 0) > 3,
                    }
                  )}
                >
                  {productCollections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-y-4 w-full mb-16 justify-between text-ui-fg-muted">
          <div className="flex justify-center lg:justify-start">
            <Text className="txt-compact-small flex justify-center">
              © {new Date().getFullYear()} AF Store. All rights reserved.
            </Text>
          </div>
          <div className="lg:hidden p-3 w-full flec justify-center items-center  h-1">
            <span className="w-full h-[0.5px] border-b"></span>
          </div>
          <div className="flex-col flex lg:flex-row items-center txt-compact-small gap-x-4">
            <span className=" flex justify-center">Secure payments :</span>
            <span className="flex gap-x-2 justify-center">
              <FaGooglePay size={20} />
              <FaCcVisa size={20} />
              <FaCreditCard size={20} />
              <SiPaytm size={20} />
              <FaPaypal size={20} />
              <FaApplePay size={20} />
              <FaAmazonPay size={20} />
              <RiCashLine size={20} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
