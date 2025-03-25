"use client"

import React from 'react';


import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

// 定义 mdxOptions 的类型
const options = {
    mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeMathjax],
    },
} as const;

// 定义 BlogPost 组件的 props 类型
type BlogPostProps = {
    source: MDXRemoteSerializeResult;
};



// 定义 getStaticProps 函数的上下文参数类型
type Context = {
    params: {
        slug: string[];
    };
};

// 定义 getStaticProps 函数的返回值类型
type StaticProps = {
    props: {
        source: MDXRemoteSerializeResult;
    };
};

// 定义 getStaticProps 函数
{
    /*
export async function getStaticProps({ params }: Context): Promise<StaticProps> {
    const { slug } = params;
    const source = `# Hello, world! $x^2 + y^2 = z^2$`;
    const mdxSource = await serialize(source, options);

    return {
        props: {
            source: mdxSource,
        },
    };
}
*/
};


