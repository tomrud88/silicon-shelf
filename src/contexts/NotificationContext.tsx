"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextType {
  notification: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
