'use client'

import Script from 'next/script'

interface GitHubBadgeProps {
  username: string
}

export default function GitHubBadge({ username }: GitHubBadgeProps) {
  return (
    <>
      <a
        className="github-button"
        href={`https://github.com/${username}`}
        data-size="large"
        data-show-count="true"
        aria-label={`Follow @${username} on GitHub`}
      >
        Follow @{username}
      </a>
      <Script src="https://buttons.github.io/buttons.js" strategy="lazyOnload" async defer />
    </>
  )
}
