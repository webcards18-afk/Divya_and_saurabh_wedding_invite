import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHost, getRequestHeader } from "@tanstack/react-start/server";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

export const getSiteOrigin = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const host = getRequestHost();
    const proto = getRequestHeader("x-forwarded-proto") || "https";
    return `${proto}://${host}`;
  } catch {
    return "";
  }
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    try {
      const origin = await getSiteOrigin();
      return { origin };
    } catch {
      return { origin: "" };
    }
  },
  head: ({ loaderData }) => {
    const origin = (loaderData as { origin?: string } | undefined)?.origin || "";
    const previewUrl = origin ? `${origin}/whatsapp-preview.jpg` : "/whatsapp-preview.jpg";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
        { title: "Wedding Invitation | Divya & Saurabh" },
        { name: "description", content: "Celebrate the royal wedding ceremony and festivities of Divya & Saurabh." },
        { name: "author", content: "Prashantarts" },
        { property: "og:title", content: "Wedding Invitation | Divya & Saurabh" },
        { property: "og:description", content: "Celebrate the royal wedding ceremony and festivities of Divya & Saurabh." },
        { property: "og:image", content: previewUrl },
        { property: "og:image:secure_url", content: previewUrl },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "600" },
        { property: "og:image:height", content: "600" },
        { property: "og:image:alt", content: "Divya & Saurabh Royal Wedding Invitation" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Divya & Saurabh Wedding" },
        { itemprop: "image", content: previewUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Wedding Invitation | Divya & Saurabh" },
        { name: "twitter:description", content: "Celebrate the royal wedding ceremony and festivities of Divya & Saurabh." },
        { name: "twitter:image", content: previewUrl },
      ],
      links: [
        {
          rel: "image_src",
          href: previewUrl,
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
        {
          rel: "icon",
          type: "image/jpeg",
          href: "/image.jpeg",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Jost:wght@300;400;500;600;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <HeadContent />
        <link rel="image_src" href="/whatsapp-preview.jpg" />
        <meta itemprop="image" content="/whatsapp-preview.jpg" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
