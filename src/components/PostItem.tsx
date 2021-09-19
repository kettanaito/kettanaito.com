import * as React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { Thumbnail } from './Thumbnail'
import { CategoryName } from './CategoryName'
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

function PostTitle({ children }: { children: string }): JSX.Element {
  return (
    <h3 className="m-0 text-2xl font-extrabold leading-7 capitalize">
      {children}
    </h3>
  )
}

function PostDescription({ children }: { children: string }): JSX.Element {
  return <p className="mt-3 text-muted">{children}</p>
}

export function PostItem({
  url,
  image,
  date,
  title,
  category,
  excerpt,
}: PostItemProps): JSX.Element {
  return (
    <article>
      <Link to={url}>
        <Thumbnail fluid={image} alt={title} />
      </Link>
      <InnerGrid>
        <header className="flex items-start justify-between my-5 text-sm sm:items-center">
          <CategoryName className="text-red-600">{category}</CategoryName>
          <p className="text-muted">{date}</p>
        </header>
        <Link to={url} className="inline-block">
          <PostTitle>{title}</PostTitle>
        </Link>
        <PostDescription>{excerpt}</PostDescription>
      </InnerGrid>
    </article>
  )
}

export function HeroPostItem({
  url,
  title,
  category,
  date,
  image,
  excerpt,
}: PostItemProps): JSX.Element {
  return (
    <article className="grid items-start gap-10 md:grid-cols-2">
      <Link to={url}>
        <Thumbnail fluid={image} alt={title} />
      </Link>
      <div className="self-center">
        <header className="mb-5 space-x-5">
          <CategoryName className="text-red-600">{category}</CategoryName>
          <span className="text-gray-500">{date}</span>
        </header>
        <Link to={url} className="inline-block">
          <PostTitle>{title}</PostTitle>
        </Link>
        <PostDescription>{excerpt}</PostDescription>
        <footer className="mt-8">
          <Author
            name="Artem Zakharchenko"
            imageUrl="https://github.com/kettanaito.png"
            description="Software engineer"
            githubHandle="kettanaito"
            twitterHandle="kettanaito"
          />
        </footer>
      </div>
    </article>
  )
}
