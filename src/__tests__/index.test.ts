import AbortController, { AbortSignal } from '../index'

describe('FastAbortController', () => {
  it('should create an instance of fast abort controller', () => {
    const controller = new AbortController()
    expect(controller).toBeInstanceOf(AbortController)
  })

  it('should abort', () => {
    const controller = new AbortController()
    expect(controller.signal.aborted).toBe(false)
    const handleAbort = jest.fn()
    controller.signal.addEventListener('abort', handleAbort)
    controller.abort()
    expect(controller.signal.aborted).toBe(true)
    expect(handleAbort).toHaveBeenCalledTimes(1)
  })
})

describe('FastAbortSignal', () => {
  it('should support static abort', () => {
    const signal = AbortSignal.abort()
    expect(signal.aborted).toBe(true)
  })
})
