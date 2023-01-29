import { SiGithub as GitHubIcon } from 'react-icons/si'

interface Props {
  owner: string
  repo: string
}

export function Repo({ owner, repo }: Props): JSX.Element {
  const gitHubUrl = `https://github.com/${owner}/${repo}`

  return (
    <article className="repo my-8">
      <a
        href={gitHubUrl}
        className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 hover:bg-gray-100"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon className="inline text-gray-600" />
        <p>
          <span className="text-gray-600">{owner}</span>
          <span className="text-gray-400 mx-1.5">/</span>
          <strong>{repo}</strong>
        </p>
      </a>
      <aside className="text-sm font-medium mt-3 text-center">
        <p className="text-gray-400">{gitHubUrl}</p>
      </aside>
    </article>
  )
}
