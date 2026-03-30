"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type TrackingIdValues = {
  gaId: string
  gtmId: string
  fbPixelId: string
}

export type TrackingIdProps = TrackingIdValues & {
  onGaIdChange: (value: string) => void
  onGtmIdChange: (value: string) => void
  onFbPixelIdChange: (value: string) => void
}

function IdField({
  id,
  label,
  description,
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  description: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </Label>
      <p className="text-sm text-gray-500">{description}</p>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
        autoComplete="off"
      />
    </div>
  )
}

export default function TrackingId({
  gaId,
  gtmId,
  fbPixelId,
  onGaIdChange,
  onGtmIdChange,
  onFbPixelIdChange,
}: TrackingIdProps) {
  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Quick setup
      </p>
      <div className="space-y-5">
        <IdField
          id="analytics-ga4"
          label="Google Analytics ID"
          description="Your GA4 Measurement ID — found in Google Analytics → Admin → Data Streams"
          placeholder="G-XXXXXXXXXX"
          value={gaId}
          onChange={onGaIdChange}
        />
        <IdField
          id="analytics-gtm"
          label="Google Tag Manager ID (optional)"
          description="Paste your GTM container ID"
          placeholder="GTM-XXXXXXX"
          value={gtmId}
          onChange={onGtmIdChange}
        />
        <IdField
          id="analytics-fb-pixel"
          label="Facebook Pixel ID (optional)"
          description="Your Meta Pixel ID from Events Manager"
          placeholder="1234567890"
          value={fbPixelId}
          onChange={onFbPixelIdChange}
        />
      </div>
    </div>
  )
}
