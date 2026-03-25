export interface BasePostMeta {
  title: string
  slug: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  draft?: boolean
  type: 'note' | 'moment'
}

export interface RenderedPost extends BasePostMeta {
  html: string
}
