import * as React from 'react'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

import { Text } from '../Text'
import { Label } from '../Label'

interface GitHubRepoProps {
  owner: string
  repo: string
}

export function GitHubRepo({ owner, repo }: GitHubRepoProps): JSX.Element {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then(setData)
  }, [owner, repo])

  return (
    <a
      href={data && data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="github-repo"
    >
      <GitHubIcon className="text-3xl -mt-0.5 text-white" />
      <div>
        {data ? (
          <>
            <p className="mt-0 font-semibold">
              {data.owner.login}/<strong>{data.name}</strong>
            </p>
            <Text as={Label} size="small">
              {data.description}
            </Text>
          </>
        ) : (
          <Label>
            Fetching{' '}
            <strong>
              {owner}/{repo}
            </strong>{' '}
            repository...
          </Label>
        )}
      </div>
    </a>
  )
}
