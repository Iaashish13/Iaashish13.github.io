"use client";

import { categories } from "@/config/categories";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allSubCategories = Object.values(categories).flatMap(
    (cat) => cat.subCategories
  );

  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Filter by Category</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        <button
          onClick={() => onCategoryChange("all")}
          className={`whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          All
        </button>
        {allSubCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => onCategoryChange(subCategory)}
            className={`whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg font-medium transition-colors ${
              selectedCategory === subCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {subCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
