import React from 'react';

interface INotificationHandlerProps {
  notification: object;
}

/**
 * Call UWF.API.Notification when component received
 * props: this.props.notification
 */
class NotificationHandler extends React.Component<
  INotificationHandlerProps,
  {}
> {
  // Create instance of UWF Notification API
  // @ts-ignore
  private notificationAPI = UWF.API.Notification.init();
  constructor(props: INotificationHandlerProps) {
    super(props);
  }

  public disconnectedCallback() {
    this.notificationAPI.unregister();
  }

  public componentDidMount() {
    // Regular React lifecycle method
  }

  public render(): JSX.Element {
    // Listen for notification state to
    // dispatch container notifications
    this.props.notification && this.props.notification.level === 'info'
      ? this.notificationAPI.info(
          `${this.props.notification.title}`,
          `${this.props.notification.message}`,
        )
      : this.notificationAPI.warning(
          `${this.props.notification.title}`,
          `${this.props.notification.message}`,
        );

    return null;
  }
}
export default NotificationHandler;
