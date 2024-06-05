import { NotificationConstructorOptions, Event } from 'electron'

type NotificationCallbackWithIndex = (event: Event, index: number) => void
type NotificationCallback = (event: Event) => void

export interface NotificationOptions extends NotificationConstructorOptions {
  onNotificationClick?: string | NotificationCallback
  onNotificationAction?: string | NotificationCallbackWithIndex
  onNotificationClose?: string | NotificationCallback
}

export type ShowNotification = (options: NotificationOptions) => void
