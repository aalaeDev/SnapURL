import { type GetServerSidePropsContext } from "next";
import React from "react";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";

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
    redirect: {
      destination: url.originalUrl,
      permanent: false,
    },
  };
}

export default function Redirect() {
  return <div>Redirecting...</div>;
}
