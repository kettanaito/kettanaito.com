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

const PostTitle = styled.p`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.36;
  letter-spacing: -0.17px;
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
      <Composition as={InnerGrid} gap={1} marginTop={2} paddingHorizontal={1}>
        <Box
          as="header"
          flex
          flexDirectionOnly="column"
          alignItems="flex-start"
          alignItemsSm="center"
          justifyContent="space-between"
          marginBottom="2px"
        >
          <CategoryName>{category}</CategoryName>
          <Label>{date}</Label>
        </Box>
        <PostLink to={url}>
          <PostTitle>{title}</PostTitle>
        </PostLink>
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
    >
      <PostLink to={url}>
        <Thumbnail fluid={image} />
      </PostLink>
      <Composition gap={1} align="center">
        <Composition
          as="header"
          inline
          templateColsMd="auto 1fr"
          alignItems="baseline"
          gapMd={1.5}
          marginBottomSmDown="2px"
        >
          <CategoryName>{category}</CategoryName>
          <Label>{date}</Label>
        </Composition>
        <PostLink to={url}>
          <PostTitle>{title}</PostTitle>
        </PostLink>
        <PostExcerpt>{excerpt}</PostExcerpt>
        <Author
          name="Artem Zakharchenko"
          description="Software engineer"
          githubHandle="kettanaito"
          twitterHandle="kettanaito"
          linkedInHandle="artem-zakharchenko"
        />
      </Composition>
    </Composition>
  )
}
