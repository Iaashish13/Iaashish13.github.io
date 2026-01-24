"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Search } from "@/components/blog/search";
import { BlogMeta } from "@/types/blog";

interface BlogClientWrapperProps {
  blogs: BlogMeta[];
}

export function BlogClientWrapper({ blogs }: BlogClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.subCategory === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.description.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <>
      {/* Filter counter */}
      {filteredBlogs.length !== blogs.length && (
        <div className="mb-4 font-mono text-sm text-muted-foreground">
          <span className="text-[hsl(var(--terminal-yellow))]">filtered:</span> {filteredBlogs.length}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="$ search posts..."
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="code-block text-center py-12">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm font-mono text-muted-foreground">
            {searchQuery.trim() || selectedCategory !== "all"
              ? "// No blog posts found matching your criteria"
              : "// No blog posts found"}
          </p>
        </div>
      )}
    </>
  );
}
