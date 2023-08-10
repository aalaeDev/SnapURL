import Link from "next/link";
import React from "react";
import AliasPopover from "~/components/AliasPopover";
import Loader from "~/components/Icons/Loader";
import UrlBox from "~/components/UrlBox";
import UrlIcon from "~/components/Icons/UrlIcon";
import Seo from "~/components/common/Seo";

import { api } from "~/utils/api";
import createURL from "~/utils/createURL";
import UrlPanel from "~/components/UrlPanel";

interface URL {
  originalUrl?: string;
  urlCode?: string;
  shortUrl?: string;
}

export default function Home() {
  // const { data: urls, isLoading } = api.url.getAll.useQuery();
  const [generatedURL, setGeneratedURL] = React.useState<URL>();
  const [alias, setAlias] = React.useState<string>("");
  const createURL_API = api.url.create.useMutation({
    onSuccess: (data) => {
      setGeneratedURL({
        shortUrl: data.shortUrl,
        urlCode: data.urlCode,
        originalUrl: data.originalUrl,
      });
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  function updateAlias(value: string) {
    setAlias(value);
  }

  function generateURL() {
    if (!inputRef.current?.value) return;
    const URL = inputRef.current.value;

    if (typeof URL !== "string" || URL.length === 0) return;

    const newURL = createURL(URL, alias);

    if (!newURL) return;

    createURL_API.mutate({ ...newURL });

    // inputRef.current.value = "";
  }
  return (
    <>
      <Seo />
      <main className="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-neutral-900 px-12 py-12">
        <h1 className="mb-8 text-5xl font-bold text-neutral-100">SnapURL</h1>

        <div
          className={`flex w-screen items-center justify-center gap-4 ${
            createURL_API.isLoading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="flex w-2/5 max-w-xl items-center gap-2 rounded-md border border-neutral-600 px-2 py-2 duration-200 focus-within:border-neutral-200">
            <span className="h-6 w-6">
              <UrlIcon />
            </span>

            <input
              ref={inputRef}
              type="url"
              placeholder="https://www.example.com"
              className="w-full bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-200"
            />

            <AliasPopover updateAlias={updateAlias} defaultAlias={alias} />
          </div>
          <button
            onClick={generateURL}
            className="flex h-12 w-32 items-center justify-center rounded-md bg-neutral-100 text-neutral-900 duration-200 hover:bg-opacity-95 hover:shadow-2xl hover:shadow-neutral-100"
          >
            {createURL_API.isLoading ? (
              <Loader className="h-5 w-5" />
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* createURL_API.isLoading ? (
          <div className="text-sm text-neutral-100">
            Generating your shortened link, please wait a moment...
          </div>
        ) :  */}
        {/* {generatedURL.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-sm text-neutral-100">
              Your shortened link is ready!
            </div>
            <UrlBox url={generatedURL} />
          </div>
        ) : null} */}

        {generatedURL?.shortUrl && generatedURL?.urlCode ? (
          <UrlPanel
            shortUrl={generatedURL.shortUrl}
            urlCode={generatedURL.urlCode}
            regenerate={generateURL}
          />
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
