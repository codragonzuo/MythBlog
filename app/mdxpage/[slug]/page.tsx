import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import MDXPost from '../MDXPost';
import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { notFound } from 'next/navigation';

interface Params {
    slug: string;
}

async function getMDXPost(slug: string) {
    const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return { fileName: slug, fileContent };
    } catch (error) {
        return null;
    }
}

export default async function BlogPage({ params }: { params: Params }) {
    const post = await getMDXPost(params.slug);
    if (!post) {
        return notFound();
    }

    return (
        <div>
            <MDXPost post={post} />
        </div>
    );
}
