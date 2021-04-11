import React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { Box, Composition } from 'atomic-layout'
import styled from 'styled-components'
import { Thumbnail } from './Thumbnail'
import { CategoryName } from './CategoryName'
import { Label } from './Label'
import { InnerGrid } from './InnerGrid'
import { Author } from './Author'

interface PostItemProps {
  url: string
  image: FluidObject[] | FluidObject
  title: string
  category: string
  excerpt: string
  date: string
}

const PostContainer = styled.article`
  ${Thumbnail} {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  &:hover ${Thumbnail} {
    --shadow-offset: 10px;
    transform: translateY(-10px);
  }
`

const PostLink = styled(Link)`
  color: currentColor;
  text-decoration: none;
`

const PostTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.36;
  letter-spacing: -0.17px;
  font-family: inherit;
  text-transform: capitalize;
`

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`

export const PostItem: React.FC<PostItemProps> = ({
  url,
  image,
  date,
  title,
  category,
  excerpt,
}) => {
  return (
    <PostContainer>
      <PostLink to={url}>
        <Thumbnail fluid={image} alt={title} />
      </PostLink>
      <Composition as={InnerGrid} marginTop={2} paddingHorizontal={1}>
        <Box
          as="header"
          flex
          flexDirectionOnly="column"
          alignItems="flex-start"
          alignItemsSm="center"
          justifyContent="space-between"
          marginBottom={1.5}
        >
          <CategoryName>{category}</CategoryName>
          <Label>{date}</Label>
        </Box>
        <Box as={PostLink} to={url} marginBottom={0.5}>
          <PostTitle>{title}</PostTitle>
        </Box>
        <PostExcerpt>{excerpt}</PostExcerpt>
      </Composition>
    </PostContainer>
  )
}

export const HeroPostItem: React.FC<PostItemProps> = ({
  url,
  title,
  category,
  date,
  image,
  excerpt,
}) => {
  return (
    <Composition
      as="article"
      templateColsMd="1fr 1fr"
      alignItems="flex-start"
      gap={2}
      gapXl={3}
    >
      <PostLink to={url}>
        <Thumbnail fluid={image} alt={title} />
      </PostLink>
      <Composition gap={0.5} align="center">
        <Composition
          as="header"
          inline
          templateColsMd="auto 1fr"
          alignItems="baseline"
          gapMd={1.5}
          marginBottom={1}
        >
          <CategoryName>{category}</CategoryName>
          <Label>{date}</Label>
        </Composition>
        <Box as={PostLink} to={url}>
          <PostTitle>{title}</PostTitle>
        </Box>
        <PostExcerpt>{excerpt}</PostExcerpt>
        <Box marginTop={1}>
          <Author
            name="Artem Zakharchenko"
            imageUrl="/images/authors/kettanaito.jpg"
            description="Software engineer"
            githubHandle="kettanaito"
            twitterHandle="kettanaito"
          />
        </Box>
      </Composition>
    </Composition>
  )
}
