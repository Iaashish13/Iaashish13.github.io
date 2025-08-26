"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/config/categories";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    subCategory: "general",
    tags: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });

  const allSubCategories = Object.values(categories).flatMap(
    (cat) => cat.subCategories
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual file creation
    console.log("Creating new blog:", formData);
    router.push("/admin");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Write and preview your new blog post before publishing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-background"
                placeholder="Enter blog title..."
                required
              />
              {formData.title && (
                <p className="text-xs text-muted-foreground mt-1">
                  Slug: {generateSlug(formData.title)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-background h-24"
                placeholder="Brief description of your blog post..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg bg-background"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sub-Category
                </label>
                <select
                  value={formData.subCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg bg-background"
                >
                  {allSubCategories.map((subCat) => (
                    <option key={subCat} value={subCat.toLowerCase()}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-background"
                placeholder="flutter, dart, mobile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Content (MDX)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-background h-64 font-mono text-sm"
                placeholder="# Your Blog Content

Write your blog content in Markdown/MDX format.

## Code Example

```dart
void main() {
  print('Hello, Flutter!');
}
```

## Conclusion

Your conclusion here..."
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted transition-colors"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Save className="h-4 w-4" />
                Create Post
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-8">
          <div className="rounded-lg border bg-background p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            {formData.title ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h1>{formData.title}</h1>
                {formData.description && (
                  <p className="text-muted-foreground">
                    {formData.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {formData.subCategory}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formData.date}
                  </span>
                </div>
                {formData.tags && (
                  <div className="flex gap-2 mb-4">
                    {formData.tags.split(",").map((tag) => (
                      <span
                        key={tag.trim()}
                        className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {formData.content && (
                  <div className="border-t pt-4">
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {formData.content}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Start typing to see a preview...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Full Preview</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                ×
              </button>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h1>{formData.title || "Untitled"}</h1>
              {formData.description && (
                <p className="text-muted-foreground">{formData.description}</p>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {formData.subCategory}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formData.date}
                </span>
              </div>
              {formData.tags && (
                <div className="flex gap-2 mb-6">
                  {formData.tags.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2 py-1 rounded bg-muted text-muted-foreground text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              {formData.content ? (
                <div className="border-t pt-4">
                  <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
                    {formData.content}
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">No content yet...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
