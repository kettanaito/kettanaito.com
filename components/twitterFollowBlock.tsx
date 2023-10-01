import { SiTwitter as TwitterIcon } from 'react-icons/si'
import { Grid } from './grid'

const twitterFollowUrl = new URL('https://twitter.com/intent/follow')
twitterFollowUrl.searchParams.set('original_referer', 'https://kettanaito.com')
twitterFollowUrl.searchParams.set('twgr', 'kettanaito')
twitterFollowUrl.searchParams.set('screen_name', 'kettanaito')
twitterFollowUrl.searchParams.set('twterm', 'follow')

export function TwitterFollowBlock({
  className,
}: {
  className?: string
}): JSX.Element {
  return (
    <div
      className={['bg-slate-100 rounded-xl p-10 text-lg']
        .concat(className || '')
        .join(' ')}
    >
      <Grid>
        <div className="col-span-full lg:col-span-4">
          <h2 className="mt-0">Stay in touch</h2>
          <p>
            Never miss a single post or a project announcement I make. Follow me
            on Twitter to stay in touch, ask a question, or just discuss
            different engineering topics together.
          </p>
        </div>
        <div className="col-span-full lg:col-span-2 self-center lg:justify-self-center">
          <a
            href={twitterFollowUrl.toString()}
            target="_blank"
            rel="noreferrer"
            className="button text-center w-full md:w-auto px-12 py-2 whitespace-nowrap"
          >
            <TwitterIcon className="inline-block -mb-[0.25ch] mr-2 align-baseline" />
            <span>Follow me</span>
          </a>
        </div>
      </Grid>
    </div>
  )
}
