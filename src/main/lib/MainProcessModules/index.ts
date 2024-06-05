import { Notification, Event } from 'electron'
import { NotificationOptions } from '../../../shared/types'

export function showNotification({
  onNotificationClick,
  onNotificationAction,
  onNotificationClose,
  ...options
}: NotificationOptions): void {
  if (Notification.isSupported()) {
    const notification = new Notification(options)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notification.on('click', (event: Event) => {
      if (typeof onNotificationClick === 'string') {
        const currentFunction = new Function('return ' + onNotificationClick.toString())()
        currentFunction(event)
      }
      if (typeof onNotificationClick === 'function') {
        onNotificationClick(event)
      }
    })

    notification.on('action', (event: Event, index: number) => {
      if (typeof onNotificationAction === 'string') {
        const currentFunction = new Function('return ' + onNotificationAction.toString())()
        currentFunction(event, index)
      }
      if (typeof onNotificationAction === 'function') {
        onNotificationAction(event, index)
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notification.on('close', (event: Event) => {
      if (typeof onNotificationClose === 'string') {
        const currentFunction = new Function('return ' + onNotificationClose.toString())()
        currentFunction(event)
      }
      if (typeof onNotificationClose === 'function') {
        onNotificationClose(event)
      }
    })

    notification.show()
  }
}
