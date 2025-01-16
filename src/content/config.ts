import { defineCollection, z } from "astro:content";
import { getCollection } from "astro:content";

function removeDuplicates(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().default(" "),
    pubDate: z.coerce.date(),
    image: z.string().default("/static/blog-placeholder.png"),
    tags: z.array(z.string()).default([]).transform(removeDuplicates),
  }),
});

export const collections = { posts };

export async function getBlogPosts() {
	const posts = await getCollection('posts');

	return posts.map((post) => {
		const fileName = post.id.split('/').pop(); // 提取文件名称部分
    const datePart = fileName?.split('.')[0] ?? '2001-08-06';
		const blog_slug = post.slug.split('/')[0];
		return {
			...post,
			blog_slug,
			fileName: datePart,
			title: post.data.title
		}
	})
}