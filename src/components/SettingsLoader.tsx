'use client'

import { useEffect, useState } from 'react'

export default function SettingsLoader() {
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/cms/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        // Update page title
        if (data.site_name) {
          document.title = data.site_title || data.site_name
        }
        // Update meta description
        const desc = document.querySelector('meta[name="description"]')
        if (desc && data.site_description) {
          desc.setAttribute('content', data.site_description)
        }
      })
      .catch(console.error)
  }, [])

  // This component doesn't render anything - it just loads settings
  return null
}
