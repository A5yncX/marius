import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: 'AsyncX | 嘿!我是AX!',
    description: 'AsyncX的博客-i18n多语言/内容聚合/编程/哲学/爱好',
    site: context.site,
    items: posts.map((post) => ({
        title: post.data.title,
        link: `/posts/${post.slug.split('/').pop()}`, // 修改链接部分以获取 "zh/XX" 中的 "XX"
        content: sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']) //渲染组件
        }),
        ...post.data,
    })),
    customData:`
    <language>zh-CN</language>
    `
});
}
