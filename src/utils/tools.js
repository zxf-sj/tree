/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/7/4
 * 历史修订：
 */

export function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
