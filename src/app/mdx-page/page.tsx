'use client';

import { MDXProvider } from '@mdx-js/react';
import ECE109Content from '../markdown/ece109.mdx';

export default function Page() {
  return (
    <MDXProvider>
      <div className="prose mx-auto p-6">
        <ECE109Content />
      </div>
    </MDXProvider>
  );
}
