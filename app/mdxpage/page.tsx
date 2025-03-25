import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import MDXPost from './MDXPost';
import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';


// 定义一个异步函数来获取 MDX 内容
async function getMDXPosts() {
    const contentDir = path.join(process.cwd(), 'content');
    const fileNames = fs.readdirSync(contentDir);
    const posts = fileNames.map((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return { fileName, fileContent };
    });

    const mdxSources = await Promise.all(
        posts.map(async (post) => {
            const options = {
                mdxOptions: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeMathjax],
                },
            };
            return { ...post };
        })
    );
    return mdxSources;
}

// 定义博客页面组件，使用 React Server Component
const BlogPage = async () => {
    const posts = await getMDXPosts();

    return (
        <div>
            {posts.map((post) => (
                <MDXPost post={{ fileName: post.fileName, fileContent: post.fileContent }} key={post.fileName} />
            ))}
        </div>
    );
};

export default BlogPage;
