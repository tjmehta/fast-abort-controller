// dom exception ponyfill
// https://developer.mozilla.org/en-US/docs/Web/API/DOMException
const DE =
  // @ts-ignore
  (typeof globalThis !== 'undefined' && globalThis?.DOMException) ??
  (() => {
    const ac = new AbortController()
    ac.abort()

    return ac.signal.reason?.constructor as typeof DOMException
  })() ??
  class DomException extends Error {
    constructor(message: string, name: string) {
      super(message)
      this.name = name
    }
  }

export default DE
