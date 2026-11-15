import { Item } from '@omnivore-app/api'
import { isStillSaving, SAVING_CONTENT } from '../api'

const url = 'https://example.com/post'
const item = (fields: Partial<Item>): Item =>
  ({ id: '1', title: 'A Post', url, originalArticleUrl: url, ...fields }) as Item

describe('isStillSaving', () => {
  test('placeholder content is still saving', () => {
    expect(isStillSaving(item({ content: `${SAVING_CONTENT}\n` }), true)).toBe(
      true,
    )
  })

  test('real content is not still saving', () => {
    expect(isStillSaving(item({ content: '# A Post\n\nBody' }), true)).toBe(
      false,
    )
  })

  test('without content, a URL title with no words is still saving', () => {
    expect(isStillSaving(item({ title: url, wordsCount: 0 }), false)).toBe(true)
  })

  test('without content, a real title is not still saving', () => {
    expect(isStillSaving(item({ wordsCount: 0 }), false)).toBe(false)
  })

  test('without content, a URL title with words counted is not still saving', () => {
    expect(isStillSaving(item({ title: url, wordsCount: 900 }), false)).toBe(
      false,
    )
  })
})
