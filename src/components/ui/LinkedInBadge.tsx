'use client'

import Script from 'next/script'

export default function LinkedInBadge() {
  return (
    <div className="flex justify-center">
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="large"
        data-theme="dark"
        data-type="HORIZONTAL"
        data-vanity="subodh-adhikari-4b811a296"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://in.linkedin.com/in/subodh-adhikari-4b811a296?trk=profile-badge"
        >
          Subodh Adhikari
        </a>
      </div>
      <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" async defer />
    </div>
  )
}
