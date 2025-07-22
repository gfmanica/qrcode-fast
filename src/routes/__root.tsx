// src/routes/__root.tsx
/// <reference types="vite/client" />
// other imports...

import type { ReactNode } from 'react';

import {
    createRootRoute,
    HeadContent,
    Link,
    Outlet,
    Scripts
} from '@tanstack/react-router';

import appCss from '../styles/app.css?url';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                title: 'TanStack Start Starter'
            }
        ],
        links: [{ rel: 'stylesheet', href: appCss }]
    }),
    component: RootComponent
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>

            <body className="flex h-dvh w-dvw flex-col">
                <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b-2 border-white/40 bg-white/40 p-2 pl-4 backdrop-blur-sm h-16">
                    <h1>
                        <Link to="/">oi </Link>
                    </h1>
                </header>

                <main className="mx-auto max-w-screen-lg flex-1 mt-16 p-16">
                    {children}
                </main>

                <Scripts />
            </body>
        </html>
    );
}
