'use client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

interface Post {
    fileName: string;
    fileContent: string;
}

const MDXPost = ({ post }: { post: Post }) => {
    return (
        <div key={post.fileName}>
            <MDXRemote 
                source={post.fileContent}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMath],
                        rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeMathjax],
                    }
                }}
            />
        </div>
    );
};

export default MDXPost;
