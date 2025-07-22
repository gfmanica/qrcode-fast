// src/routes/index.tsx
import { useEffect, useRef, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
// @ts-ignore
import QRCodeStyling from 'qr-code-styling';

export const Route = createFileRoute('/')({
    component: Home
});

function Home() {
    // Estado para a URL
    const [url, setUrl] = useState('https://exemplo.com');
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCode = useRef<any>(null);

    useEffect(() => {
        qrCode.current = new QRCodeStyling({
            width: 200,
            height: 200,
            data: url
        });
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qrCode.current.append(qrRef.current);
        }
        return () => {
            if (qrRef.current) qrRef.current.innerHTML = '';
        };
    }, []);

    useEffect(() => {
        if (qrCode.current) {
            qrCode.current.update({ data: url });
        }
    }, [url]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Digite a URL"
                style={{ padding: 8, fontSize: 16 }}
            />
            <div ref={qrRef} />
            <button
                type="button"
                onClick={() => {
                    if (qrCode.current) {
                        qrCode.current.download({
                            name: 'qrcode',
                            extension: 'png'
                        });
                    }
                }}
                style={{ padding: 8, fontSize: 16, marginTop: 8 }}
            >
                Baixar QR Code
            </button>
        </div>
    );
}
