import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

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

export const mdxComponents: MDXComponents = {
  Image: (props: ImageProps) => (
    <Image {...props} className="my-6" />
  ),
  a: CustomLink,
}
