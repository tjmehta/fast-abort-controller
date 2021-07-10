import FastAbortController, { FastAbortSignal } from '../index'

describe('FastAbortController', () => {
  it('should create an instance of fast abort controller', () => {
    const controller = new FastAbortController()
    expect(controller).toBeInstanceOf(FastAbortController)
  })

  it('should abort', () => {
    const controller = new FastAbortController()
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
    const signal = FastAbortSignal.abort()
    expect(signal.aborted).toBe(true)
  })
})
