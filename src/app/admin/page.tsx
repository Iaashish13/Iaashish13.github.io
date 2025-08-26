"use client";

import { useState, useEffect } from "react";
import { getAllBlogs } from "@/lib/mdx";
import { BlogMeta } from "@/types/blog";
import { categories } from "@/config/categories";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function AdminPage() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogMeta | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogMeta | null>(null);

  useEffect(() => {
    const allBlogs = getAllBlogs();
    setBlogs(allBlogs);
  }, []);

  const handleDelete = (blog: BlogMeta) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      // TODO: Implement actual file deletion
      console.log("Deleting blog:", blogToDelete.slug);
      setBlogs(blogs.filter((blog) => blog.slug !== blogToDelete.slug));
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleEdit = (blog: BlogMeta) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handlePreview = (blog: BlogMeta) => {
    setSelectedBlog(blog);
    setIsPreviewModalOpen(true);
  };

  const allSubCategories = Object.values(categories).flatMap(
    (cat) => cat.subCategories
  );

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Admin</h1>
        <p className="text-muted-foreground">
          Manage your blog posts, edit content, and preview changes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border bg-background">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">Total Posts</span>
          </div>
          <p className="text-2xl font-bold mt-2">{blogs.length}</p>
        </div>
        <div className="p-4 rounded-lg border bg-background">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Published</span>
          </div>
          <p className="text-2xl font-bold mt-2">{blogs.length}</p>
        </div>
        <div className="p-4 rounded-lg border bg-background">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Drafts</span>
          </div>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="p-4 rounded-lg border bg-background">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Categories</span>
          </div>
          <p className="text-2xl font-bold mt-2">{allSubCategories.length}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Blog Post
        </Link>
      </div>

      {/* Blog List */}
      <div className="rounded-lg border bg-background">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Blog Posts</h2>
        </div>
        <div className="divide-y">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{blog.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {blog.subCategory}
                  </span>
                  <span>{formatDate(blog.date)}</span>
                  <span>{blog.readingTime}</span>
                  <span>{blog.tags.length} tags</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePreview(blog)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog)}
                  className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Blog Post</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete &quot;{blogToDelete?.title}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Blog Post</h3>
            <EditBlogForm
              blog={selectedBlog}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Preview: {selectedBlog.title}
              </h3>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                ×
              </button>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h1>{selectedBlog.title}</h1>
              <p className="text-muted-foreground">
                {selectedBlog.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {selectedBlog.subCategory}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(selectedBlog.date)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedBlog.readingTime}
                </span>
              </div>
              <div className="flex gap-2 mb-6">
                {selectedBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-muted text-muted-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground">
                [Blog content preview would be displayed here]
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Blog Form Component
function EditBlogForm({
  blog,
  onClose,
}: {
  blog: BlogMeta;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    category: blog.category,
    subCategory: blog.subCategory,
    tags: blog.tags.join(", "),
    date: blog.date.split("T")[0], // Convert ISO date to YYYY-MM-DD
  });

  const allSubCategories = Object.values(categories).flatMap(
    (cat) => cat.subCategories
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual file update
    console.log("Updating blog:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border rounded-lg bg-background"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border rounded-lg bg-background h-24"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
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
          <label className="block text-sm font-medium mb-2">Sub-Category</label>
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
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-3 border rounded-lg bg-background"
          placeholder="flutter, dart, mobile"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-3 border rounded-lg bg-background"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
