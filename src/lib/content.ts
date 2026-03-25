import MarkdownIt from 'markdown-it'
import type { BasePostMeta, RenderedPost } from '../types/content'

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const note_modules = import.meta.glob('../content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const moment_modules = import.meta.glob('../content/moments/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function map_modules_to_posts(
  modules: Record<string, string>,
  default_type: 'note' | 'moment',
): RenderedPost[] {
  return Object.values(modules)
    .map((raw_content) => {
      const { data, content } = parse_frontmatter(raw_content)
      if (!data.title || !data.slug || !data.date || !data.summary) {
        return null
      }
      const post: RenderedPost = {
        title: data.title,
        slug: data.slug,
        date: data.date,
        summary: data.summary,
        tags: data.tags ?? [],
        cover: data.cover,
        draft: data.draft ?? false,
        type: data.type ?? default_type,
        html: markdown.render(content),
      }
      return post
    })
    .filter((post): post is RenderedPost => post !== null && !post.draft)
    .sort((left, right) => right.date.localeCompare(left.date))
}

function parse_frontmatter(raw_text: string): {
  data: Partial<BasePostMeta>
  content: string
} {
  const match = raw_text.match(/^---\s*[\r\n]+([\s\S]*?)\s*[\r\n]+---\s*[\r\n]*([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw_text.trim() }
  }
  const frontmatter_text = match[1]
  const markdown_content = match[2].trim()
  const data: Partial<BasePostMeta> = {}
  const lines = frontmatter_text.split(/\r?\n/)
  for (const raw_line of lines) {
    const line = raw_line.trim()
    if (!line || line.startsWith('#')) {
      continue
    }
    const split_index = line.indexOf(':')
    if (split_index <= 0) {
      continue
    }
    const key = line.slice(0, split_index).trim()
    const value_text = line.slice(split_index + 1).trim()
    if (key === 'tags') {
      data.tags = parse_tags(value_text)
      continue
    }
    if (key === 'draft') {
      data.draft = value_text === 'true'
      continue
    }
    const clean_value = value_text.replace(/^['"]|['"]$/g, '')
    if (key === 'title') data.title = clean_value
    if (key === 'slug') data.slug = clean_value
    if (key === 'date') data.date = clean_value
    if (key === 'summary') data.summary = clean_value
    if (key === 'cover') data.cover = clean_value
    if (key === 'type' && (clean_value === 'note' || clean_value === 'moment')) {
      data.type = clean_value
    }
  }
  return { data, content: markdown_content }
}

function parse_tags(value_text: string): string[] {
  const clean_text = value_text.replace(/^\[|\]$/g, '')
  if (!clean_text) {
    return []
  }
  return clean_text
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

const all_notes = map_modules_to_posts(note_modules, 'note')
const all_moments = map_modules_to_posts(moment_modules, 'moment')

export function get_notes(): RenderedPost[] {
  return all_notes
}

export function get_moments(): RenderedPost[] {
  return all_moments
}

export function find_note_by_slug(slug: string): RenderedPost | undefined {
  return all_notes.find((item) => item.slug === slug)
}

export function find_moment_by_slug(slug: string): RenderedPost | undefined {
  return all_moments.find((item) => item.slug === slug)
}
