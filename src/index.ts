import EventEmitter3 from 'eventemitter3'

class FastAbortSignal implements AbortSignal {
  private ee = new EventEmitter3()
  readonly aborted: boolean = false

  static abort() {
    const signal = new FastAbortSignal()
    signal.dispatchEvent({ type: 'abort' } as Event)
    return signal
  }

  set onabort(
    listener: (this: AbortSignal, ev: AbortSignalEventMap['abort']) => any,
  ) {
    this.addEventListener('abort', listener)
  }
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    // @ts-ignore
    this.ee.addListener(type, listener)
  }
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    // @ts-ignore
    this.ee.removeListener(type, listener)
  }
  dispatchEvent(event: Event): boolean {
    // @ts-ignore
    this.aborted = true
    this.ee.emit(event.type)
    return true
  }
}

export const AbortSignal = FastAbortSignal

export default class FastAbortController implements AbortController {
  signal = new FastAbortSignal()
  abort() {
    this.signal.dispatchEvent({ type: 'abort' } as Event)
  }
}
