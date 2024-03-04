import GlobalAbortSignal from './GlobalAbortSignal'
import EventEmitter3 from 'eventemitter3'
import DomException from './DomExceptionPonyfill'

interface AbortSignalEventMap {
  abort: Event
}

// name needs to literally be "AbortSignal" for some instanceof checks
export default class AbortSignal implements GlobalAbortSignal {
  // custom event emitter
  private ee = new EventEmitter3()
  // aborted
  readonly aborted: boolean = false
  // reason
  private _reason: any
  public get reason(): any {
    if (!this.aborted) return
    if (this._reason) return this._reason

    // @ts-ignore
    this._reason = Object.create(DomException.prototype, {
      name: { value: 'AbortError' },
      message: { value: 'The operation was aborted.' },
      code: { value: 20 },
    })

    return this._reason
  }

  static abort(): GlobalAbortSignal {
    const signal = new AbortSignal()

    signal.dispatchEvent({ type: 'abort' } as Event)

    return signal
  }

  throwIfAborted(): void {
    if (this.aborted) {
      throw this.reason
    }
  }

  set onabort(
    listener: (
      this: GlobalAbortSignal,
      ev: AbortSignalEventMap['abort'],
    ) => any,
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
    // create reason lazily...
    this.ee.emit(event.type)
    return true
  }
}
