import Head from "next/head";
import Link from "next/link";
import React from "react";
import UrlBox from "~/components/UrlBox";
import UrlIcon from "~/components/UrlIcon";

import { api } from "~/utils/api";
import createURL from "~/utils/createURL";

import thumbnail from "~/public/thumbnail.jpg";

export default function Home() {
  // const { data: urls, isLoading } = api.url.getAll.useQuery();
  const [generatedURL, setGeneratedURL] = React.useState<string>("");
  const createURL_API = api.url.create.useMutation({
    onSuccess: (shortUrl) => {
      if (!shortUrl) return;
      setGeneratedURL(shortUrl);
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  function generateURL() {
    if (!inputRef.current?.value) return;
    const URL = inputRef.current.value;

    if (typeof URL !== "string" || URL.length === 0) return;

    const newURL = createURL(URL);

    if (!newURL) return;

    createURL_API.mutate({ ...newURL });

    // inputRef.current.value = "";
  }
  return (
    <>
      <Head>
        <title>SnapURL</title>
        <meta
          name="description"
          content="SnapURL is a powerful URL shortener app that helps you simplify long web addresses into concise and shareable links. With built-in analytics, track the number of clicks, IP addresses, and timestamps for each link. SnapURL provides a seamless experience for transforming and managing your links. Start shortening and sharing with ease today!"
        />

        <meta key="og_type" property="og:type" content="website" />
        <meta key="og_title" property="og:title" content="SnapURL" />
        <meta
          key="og_description"
          property="og:description"
          content="SnapURL is a powerful URL shortener app that helps you simplify long web addresses into concise and shareable links. With built-in analytics, track the number of clicks, IP addresses, and timestamps for each link. SnapURL provides a seamless experience for transforming and managing your links. Start shortening and sharing with ease today!"
        />
        <meta key="og_locale" property="og:locale" content="en_IE" />
        <meta key="og_site_name" property="og:site_name" content="SnapURL" />
        <meta
          key="og_url"
          property="og:url"
          content="https://snapurl.vercel.app/"
        />
        <meta key="og_site_name" property="og:site_name" content="SnapURL" />
        <meta key="og_image" property="og:image" content={thumbnail.src} />
        <meta key="og_image:alt" property="og:image:alt" content="SnapURL" />
        <meta key="og_image:width" property="og:image:width" content="1200" />
        <meta key="og_image:height" property="og:image:height" content="630" />

        <meta name="robots" content="index,follow" />

        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="SnapURL" />
        <meta key="twitter:creator" name="twitter:creator" content="SnapURL" />
        <meta key="twitter:title" property="twitter:title" content="SnapURL" />
        <meta
          key="twitter:description"
          property="twitter:description"
          content="SnapURL is a powerful URL shortener app that helps you simplify long web addresses into concise and shareable links. With built-in analytics, track the number of clicks, IP addresses, and timestamps for each link. SnapURL provides a seamless experience for transforming and managing your links. Start shortening and sharing with ease today!"
        />

        <link rel="canonical" href="https://snapurl.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-neutral-900 px-12 py-12">
        <h1 className="text-4xl font-bold text-neutral-100">SnapURL</h1>

        <div
          className={`flex w-screen items-center justify-center gap-4 ${
            createURL_API.isLoading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="flex w-2/5 max-w-xl gap-2 rounded-md border border-neutral-600 px-2 py-2 duration-200 focus-within:border-neutral-200">
            <UrlIcon />

            <input
              ref={inputRef}
              type="url"
              placeholder="https://www.example.com"
              className="w-full bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-200"
            />
          </div>
          <button
            onClick={generateURL}
            className="rounded-md bg-neutral-100 px-6 py-2 text-sm text-neutral-900 duration-200 hover:bg-opacity-95 hover:shadow-2xl hover:shadow-neutral-100"
          >
            Generate
          </button>
        </div>

        {createURL_API.isLoading ? (
          <div className="text-sm text-neutral-100">
            Generating your shortened link, please wait a moment...
          </div>
        ) : generatedURL.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-sm text-neutral-100">
              Your shortened link is ready!
            </div>
            <UrlBox url={generatedURL} />
          </div>
        ) : null}

        <footer className="fixed bottom-4 text-xs text-neutral-200">
          Developed by{" "}
          <Link
            href="https://github.com/aalaeDev"
            className="underline duration-200 hover:text-neutral-100"
          >
            aalaedev
          </Link>
          . The source code is on{" "}
          <Link
            href="https://github.com/aalaeDev/SnapURL"
            className="underline duration-200 hover:text-neutral-100"
          >
            GitHub
          </Link>
          .
        </footer>
      </main>
    </>
  );
}
