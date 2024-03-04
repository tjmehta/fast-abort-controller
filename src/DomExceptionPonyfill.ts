// @ts-ignore
import getGlobalThis from 'globalthis'

const globalThis = getGlobalThis()

const DE =
  // @ts-ignore
  globalThis?.DOMException ??
  (() => {
    const ac = new AbortController()
    ac.abort()
    // @ts-ignore
    return ac.signal.reason?.constructor as typeof DOMException
  })() ??
  class DomException extends Error {
    constructor(message: string, name: string) {
      super(message)
      this.name = name
    }
  }

export default DE
