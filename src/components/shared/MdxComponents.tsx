import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type { ImgHTMLAttributes } from 'react'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  if (href?.startsWith('/')) {
    return (
      <Link
        href={href}
        {...props}
        className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
      />
    )
  }
  if (href?.startsWith('#')) {
    return (
      <a
        {...props}
        className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
      />
    )
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
      className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
    />
  )
}

type BlogImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  caption?: string
}

const BlogImage = ({ caption, className, ...props }: BlogImageProps) => {
  const mergedClassName = ['h-auto max-w-full', className]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className="my-5 flex justify-center">
      <img {...props} className={mergedClassName} />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export const mdxComponents: MDXComponents = {
  Image: (props: ImageProps) => <Image {...props} className="my-6" />,
  a: CustomLink,
  BlogImage,
}
