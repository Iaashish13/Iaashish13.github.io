import { NextRequest, NextResponse } from "next/server";
import {
  createBlogFile,
  updateBlogFile,
  deleteBlogFile,
  BlogFormData,
} from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const formData: BlogFormData = await request.json();

    const success = createBlogFile(formData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Blog created successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to create blog" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { slug, formData }: { slug: string; formData: BlogFormData } =
      await request.json();

    const success = updateBlogFile(slug, formData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to update blog" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { slug } = await request.json();

    const success = deleteBlogFile(slug);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to delete blog" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
