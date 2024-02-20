"use client"
import React from "react"
import { ProductCategoryWithChildren } from "types/global"

const CollectionNav = ({
  categories,
}: {
  categories: ProductCategoryWithChildren[]
}) => {
  return (
    <>
      <div className="">
        <div className="mx-auto content-container">
          <div className="mx-auto max-w-2xl  lg:max-w-none ">
            <h2 className="text-[12vw] sm:text-[7vw] lg:text-[5vw] font-medium text-gray-900">
              Categories
            </h2>

            <div className="mt-6 gap-2 grid grid-cols-2 lg:grid-cols-4">
              {categories
                .filter((project) => project.parent_category_id === null)
                .map((category) => (
                  <div key={category.name} className="group relative">
                    <div className="relative overflow-hidden rounded-lg bg-white aspect-square group-hover:shadow-elevation-card-hover  border">
                      <img
                        src="http://localhost:8000/_next/image?url=https%3A%2F%2Fmedusa-public-images.s3.eu-west-1.amazonaws.com%2Fsweatshirt-vintage-front.png&w=1920&q=75"
                        alt={category.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-black font-medium">
                      <a href={`/categories/${category.handle}`}>
                        <span className="absolute inset-0" />
                        {category.name}
                      </a>
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full  text-[12vw] sm:text-[7vw] lg:text-[5vw] font-medium py-6 content-container">
        <h1>Categories</h1>
      </div>
      <div className="w-full h-full relative">
        <div className={styles.container}>
          <Titles data={categories} setSelectedProject={setSelectedProject} />
          <Descriptions data={categories} selectedProject={selectedProject} />
        </div>
      </div> */}
    </>
  )
}
export default CollectionNav
