import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Composition } from 'atomic-layout'
import { ReactComponent as BookIcon } from 'heroicons/dist/outline-md/md-book-open.svg'

import { Text } from '../Text'
import { Label } from '../Label'

const StyledContainer = styled.a`
  --box-shadow-color: ${({ theme }) =>
    theme.utils.alpha(theme.colors.primary, 0.16)};

  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  box-shadow: 0 0 0 4px var(--box-shadow-color);
  text-decoration: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: 0 0 0 8px var(--box-shadow-color);
  }
`

const RepoName = styled.p`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.styles.gitHubRepo.linkColor};
  font-size: 1.1rem;
  font-weight: 500;
`

interface GitHubRepoProps {
  owner: string
  repo: string
}

export const GitHubRepo: React.FC<GitHubRepoProps> = ({ owner, repo }) => {
  const [data, setData] = React.useState(null)
  const theme = useTheme()

  React.useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then(setData)
  }, [owner, repo])

  return (
    <Composition
      href={data && data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      as={StyledContainer}
      areas="icon content"
      templateCols="auto 1fr"
      gap={0.75}
      alignItems="center"
      marginVertical={2}
      marginVerticalMd={4}
      padding={2}
    >
      {({ Icon, Content }) => (
        <>
          <Icon
            as={BookIcon}
            width="24px"
            stroke={theme.colors.primary}
            align="start"
            marginTop="3px"
          />
          <Content>
            {data ? (
              <>
                <RepoName>
                  {data.owner.login}/<strong>{data.name}</strong>
                </RepoName>
                <Text as={Label} sizeVariant="small">
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
          </Content>
        </>
      )}
    </Composition>
  )
}
