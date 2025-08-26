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
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
