"use client";

import { useNotification } from "@/contexts/NotificationContext";
import Notification from "@/components/Notification";

export default function NotificationDisplay() {
  const { notification, hideNotification } = useNotification();

  if (!notification) {
    return null;
  }

  return <Notification message={notification} onClose={hideNotification} />;
}
