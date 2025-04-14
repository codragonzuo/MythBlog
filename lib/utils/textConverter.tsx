import { slug } from "github-slugger";
import { marked } from "marked";
import React, { ElementType } from "react";

// slugify
export const slugify = (content: string | null | undefined): string | null => {
  if (!content) return null;
  return slug(content);
};

// markdownify
export const markdownify = (
  content: string | null | undefined,
  tag?: ElementType,
  className?: string
): React.ReactElement | null => {
  if (!content) return null;

  const Tag = tag || "span";
  const html = tag === "div" 
    ? marked.parse(content) 
    : marked.parseInline(content);
  
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// humanize
export const humanize = (content: string | null | undefined): string | null => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (m) => m.toUpperCase());
};

// plainify
export const plainify = async (content: string | null | undefined): Promise<string | null> => {
  if (!content) return null;

  const mdParsed = await marked.parseInline(String(content));
  const filterBrackets = mdParsed.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList = {
    "&nbsp;": " ",
    "<": "<",
    ">": ">", 
    "&": "&",
    """: "\"",
    "&#39;": "'"
  };
  
  return htmlWithEntities.replace(
    /(&|<|>|"|&#39;)/g,
    (entity) => entityList[entity as keyof typeof entityList]
  );
};
