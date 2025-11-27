"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogHeader from "@/components/blogs/BlogHeader";
import Header from "@/components/ui/header";
import Footer from "@/components/landing-sections/footer";
import { blogs, BlogTag } from "@/data/blogs";

const filterTags: BlogTag[] = [
  "all",
  "engineering",
  "startup",
  "distribution",
  "misc",
];

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<BlogTag>("all");
  // const [search, setSearch] = useState("");
  const MotionLink = motion(Link);

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    if (selectedTag !== "all") {
      result = result.filter((blog) => blog.tag === selectedTag);
    }

    return result.sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(2000 + year, month - 1, day);
      };
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });
  }, [selectedTag]);

  return (
    <main className="min-h-screen w-full bg-surface-primary text-text-primary font-sans">
      <BlogHeader />
      <Header title="Blogs" />
      <div className="w-full border-b border-border py-10 relative">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
            className="flex items-center justify-center gap-3 mb-6 flex-wrap"
          >
            {filterTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                  selectedTag === tag
                    ? "bg-brand-purple text-text-primary ring-1 ring-border-focus"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <p className="text-text-secondary text-base font-medium text-center">
                No blog posts found, More blogs coming soon stay tuned.
              </p>
            </div>
          ) : (
            filteredBlogs.map((blog, index) => (
              <MotionLink
                key={index}
                href={blog.link}
                target="_blank"
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.2 + index * 0.05,
                }}
                className="border border-border rounded-xl p-6 bg-surface-secondary hover:bg-surface-hover transition-colors duration-300 block"
              >
                <h3 className="text-2xl font-medium tracking-tight leading-tight text-text-primary mb-3">
                  {blog.linkText}
                </h3>

                <p className="text-text-muted text-xs font-medium uppercase tracking-[0.35em] mb-3">
                  {blog.tag} • {blog.date}
                </p>

                <span className="text-link hover:text-link-hover text-sm font-medium tracking-wide">
                  Read more
                </span>
              </MotionLink>
            ))
          )}
        </div>
      </div>
      <Footer />
      
      {/* <div className="max-w-[2000px] w-full mx-auto">
        <FaqSection />
        <Brands />
        <Testimonials />
        <CTA />
        
      {/* </div>  */}
    </main>
  );
}