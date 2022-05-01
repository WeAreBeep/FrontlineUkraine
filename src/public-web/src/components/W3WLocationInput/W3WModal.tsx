import { Modal, ModalProps } from '@mantine/core';
import React, { useRef } from 'react';

export function W3WModal(
  props: Omit<ModalProps, 'styles'>
): ReturnType<React.FC> {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  return (
    <Modal
      {...props}
      styles={{ body: { minHeight: '60vh', position: 'relative' } }}
      title={
        props.title ??
        'Turn on your GPS and get the 3 words that describe your exact location'
      }
    >
      <iframe
        ref={iframeRef}
        style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}
        width="100%"
        height="100%"
        allow="geolocation 'self' 'src'; clipboard-read; clipboard-write"
        src="https://what3words.com"
      ></iframe>
    </Modal>
  );
}
