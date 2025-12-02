'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { notification } from 'antd';

export function FlashMessage() {
    const [api, contextHolder] = notification.useNotification();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

   const openNotificationWithIcon = () => {
    api.success({
      title: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  useEffect(() => {
    // 1. ¿Tenemos el flag de verificado?
    if (searchParams.get('verified') === 'true') {
      
      // 2. Mostrar notificación de éxito
      openNotificationWithIcon();

      // 3. Limpiar la URL para que no salga el mensaje si recarga
      // Usamos replace para no romper el historial "Atrás"
      const params = new URLSearchParams(searchParams);
      params.delete('verified');
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, replace]);

  return (
    <>
      {contextHolder}
    </>
  );
}
