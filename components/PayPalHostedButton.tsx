'use client';

import { useCallback, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

const PAYPAL_SDK_SRC =
  'https://www.paypal.com/sdk/js?client-id=BAAAMPvvK7Uk7LKqjBZ7IK5hh4LuKgpGxI3MZ_k_2SpVCJ4Uy2kmSm6JM9icntBQaQppeITw2_PyiWt2Mk&components=hosted-buttons&disable-funding=venmo&currency=USD';

const CONTAINER_ID = 'paypal-container-QTSUNJ48HXTEN';
const BUTTON_ID = 'QTSUNJ48HXTEN';
const SDK_SCRIPT_ID = 'paypal-hosted-buttons-sdk';

export default function PayPalHostedButton() {
  const [loadError, setLoadError] = useState(false);

  const renderHostedButton = useCallback(() => {
    if (!window.paypal?.HostedButtons) {
      setLoadError(true);
      return;
    }
    const container = document.getElementById(CONTAINER_ID);
    if (container) {
      container.innerHTML = '';
      const renderResult = window.paypal
        .HostedButtons({ hostedButtonId: BUTTON_ID })
        .render(`#${CONTAINER_ID}`);

      if (renderResult && typeof (renderResult as Promise<void>).catch === 'function') {
        (renderResult as Promise<void>).catch(() => setLoadError(true));
      }
    }
  }, []);

  return (
    <>
      <Script
        id={SDK_SCRIPT_ID}
        src={PAYPAL_SDK_SRC}
        strategy="afterInteractive"
        onReady={renderHostedButton}
        onError={() => setLoadError(true)}
      />
      <div id={CONTAINER_ID} />
      {loadError ? (
        <p className="mt-3 text-sm text-red-600">
          PayPal button could not load. Disable ad-blocker or test on live domain.
        </p>
      ) : null}
    </>
  );
}
