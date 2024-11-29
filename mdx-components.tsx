import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import 'katex/dist/katex.min.css';
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: 'white', fontSize: '36px' }}>{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 style={{ color: 'grey', fontSize: '30px'}}>{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 style={{ color: 'lightgrey', fontSize: '24px'}}>{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 style={{ color: 'lightgrey', fontSize: '17px'}}>{children}</h4>
    ),
    p: ({ children }) => (
        <p style={{ color: 'lightgrey', fontSize: '16px'}}>{children}</p>
    ),
    strong: ({ children }) => (
        <strong style={{ color: 'lightgrey', fontSize: '17px'}}>{children}</strong>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}