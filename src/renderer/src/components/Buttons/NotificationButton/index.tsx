import { NotificationOptions } from '../../../../../shared/types'
import { ActionButton } from '../ActionButton'
import { DefaultButtonProps } from '../types'

export function NotificationButton({ ...props }: DefaultButtonProps): JSX.Element {
  const handleNotificationAction = (_, index: number): void => {
    console.log('Notification Action from NotificationButton', index)
  }
  const handleNotificationClose = (): void => {
    console.log('Notification Close from NotificationButton')
  }

  const handleNotification = (): void => {
    const options: NotificationOptions = {
      title: 'NoteMark from render',
      body: 'Notification message from render',
      actions: [{ type: 'button', text: 'Download' }],
      closeButtonText: 'Custom Close',
      onNotificationAction: handleNotificationAction.toString(),
      onNotificationClose: handleNotificationClose.toString()
    }
    window.api.showNotification(options)
  }

  return (
    <ActionButton onClick={handleNotification} {...props}>
      Notification
    </ActionButton>
  )
}
