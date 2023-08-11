import type { NextPage, GetServerSidePropsContext } from "next";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import Seo from "~/components/common/Seo";
import Link from "next/link";
import VisitorsTable from "~/components/VisitorsTable";
import React from "react";
import Loader from "~/components/Icons/Loader";
import { cutString } from "~/utils/cutString";
import CheckIcon from "~/components/Icons/CheckIcon";
import Tooltip from "~/components/ui/Tooltip";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const urlCode = context.params?.id;

  const ssr = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  if (typeof urlCode !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const url = await ssr.url.getByUrlCode.fetch({ urlCode });

  if (!url) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      trpcState: ssr.dehydrate(),
      urlCode,
    },
  };
}

const Analytics: NextPage<{ urlCode: string }> = ({ urlCode }) => {
  const {
    data: url,
    isLoading,
    // isError,
    isRefetching,
  } = api.url.getByUrlCode.useQuery({ urlCode });

  // if ((!url && !isLoading) || isError) return <>Error Occurred!</>;
  if (isLoading) return <>Loading!</>;
  // if (isFetching) return <>Fetching!</>;

  if (!url) return <></>;

  return (
    <>
      <Seo title="Analytics" />

      <main className="mx-auto flex h-screen w-screen max-w-6xl flex-col gap-4 bg-neutral-900 p-6 text-neutral-100">
        <h1 className="text-4xl font-bold">
          SnapURL <span className="text-lg font-normal">Analytics</span>
        </h1>

        <div className="flex justify-between rounded-md border border-neutral-600 p-4 ">
          <div className="flex gap-3 ">
            Url Code:{" "}
            <span className="font-normal text-neutral-200">
              {cutString(urlCode, 30)}
            </span>
          </div>
          <div className="flex gap-3">
            Original Url:{" "}
            <Link
              href={url.originalUrl}
              className="font-normal text-neutral-200 hover:underline"
            >
              {cutString(url.originalUrl, 40)}
            </Link>
          </div>
          <div className="flex gap-3">
            Visits:{" "}
            <span className="font-normal text-neutral-200">{url.clicks}</span>
          </div>

          <div className="flex gap-3">
            Status:{" "}
            <span className="flex items-center font-normal text-neutral-200">
              {isRefetching ? (
                <Tooltip content="Checking for updates..." position="top-6">
                  <Loader className="h-4 w-4" />
                </Tooltip>
              ) : (
                <Tooltip content="Up to date." position="top-6">
                  <CheckIcon className="h-4 w-4" />
                </Tooltip>
              )}
            </span>
          </div>
        </div>

        <VisitorsTable urlId={url.id} />

        <footer className="fixed bottom-4 left-1/2  -translate-x-1/2 text-xs text-neutral-200">
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
};

export default Analytics;
