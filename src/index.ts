import _FastAbortSignal from './FastAbortSignal'
// @ts-ignore
import getGlobalThis from 'globalthis'

const globalThis = getGlobalThis()

export const FastAbortSignal = _FastAbortSignal

export class FastAbortController implements AbortController {
  signal: AbortSignal = new FastAbortSignal()
  abort = () => this.signal.dispatchEvent({ type: 'abort' } as Event)
}

export const hasAbortController =
  typeof globalThis !== 'undefined' &&
  'AbortController' in globalThis &&
  globalThis.AbortController !== FastAbortController

const AbortControllerClass = hasAbortController
  ? globalThis.AbortController
  : FastAbortController

export default AbortControllerClass
