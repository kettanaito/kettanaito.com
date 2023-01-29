import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client'
import { HiChevronRight as ChevronRightIcon } from 'react-icons/hi'
import { Code } from 'react-cdx'
import { type Language } from 'prism-react-renderer'

import { Quote } from './quote'
import { Repo } from './repo'

export const mdxComponents: MDXContentProps['components'] = {
  a(props) {
    return <a {...props} target="_blank" rel="noreferrer" />
  },
  pre({ children }) {
    return <>{children}</>
  },
  code({ children, className = '' }) {
    const code = children?.toString() || ''

    if (!code.includes('\n')) {
      return <code>{children}</code>
    }

    const language = /language-(\w+)/.exec(className)?.[1] || 'typescript'
    const lines = code.match(/\n/gm)
    const linesCount = lines?.length ?? 0

    return (
      <Code
        className="code"
        language={language as Language}
        showNumbers={true}
        formatLineNumber={(lineNumber) =>
          linesCount > 1 ? (
            <>{lineNumber}</>
          ) : (
            <ChevronRightIcon className="inline text-xl" />
          )
        }
        code={code}
      />
    )
  },
  table(props) {
    return (
      <div className="table-wrapper">
        <table {...props} />
      </div>
    )
  },
  Quote,
  Repo,
}
