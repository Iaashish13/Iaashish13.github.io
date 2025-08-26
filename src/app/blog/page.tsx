"use client";

import { useState, useMemo } from "react";
import { getAllBlogs } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Search } from "@/components/blog/search";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const allBlogs = getAllBlogs();

  const filteredBlogs = useMemo(() => {
    let filtered = allBlogs;

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
  }, [allBlogs, selectedCategory, searchQuery]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights about Flutter, React, and software
          development.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search blog posts..."
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery.trim() || selectedCategory !== "all"
              ? "No blog posts found matching your criteria."
              : "No blog posts found."}
          </p>
        </div>
      )}
    </div>
  );
}
