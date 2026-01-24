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
      <h2 className="text-base sm:text-lg font-mono font-semibold mb-4 text-foreground">
        <span className="text-[hsl(var(--terminal-blue))]">{`// `}</span>
        filter by category:
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        <button
          onClick={() => onCategoryChange("all")}
          className={`whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm rounded font-mono transition-all border ${
            selectedCategory === "all"
              ? "bg-[hsl(var(--terminal-green))]/10 border-[hsl(var(--terminal-green))]/50 text-[hsl(var(--terminal-green))]"
              : "bg-secondary border-border text-muted-foreground hover:bg-muted hover:border-[hsl(var(--terminal-green))]/30"
          }`}
        >
          all
        </button>
        {allSubCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => onCategoryChange(subCategory)}
            className={`whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm rounded font-mono transition-all border ${
              selectedCategory === subCategory
                ? "bg-[hsl(var(--terminal-green))]/10 border-[hsl(var(--terminal-green))]/50 text-[hsl(var(--terminal-green))]"
                : "bg-secondary border-border text-muted-foreground hover:bg-muted hover:border-[hsl(var(--terminal-green))]/30"
            }`}
          >
            {subCategory.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
