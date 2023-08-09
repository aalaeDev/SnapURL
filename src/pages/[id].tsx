import { type GetServerSidePropsContext } from "next";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { type IPAddressInfo } from "~/types";

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

  const visitor = await fetch("http://ip-api.com/json/?fields=61439")
    .then((response) => {
      if (!response.ok) {
        return undefined;
      }
      return response.json();
    })
    .then((data: IPAddressInfo) => {
      return data;
    })
    .catch((_) => {
      return undefined;
    });

  await prisma.visitor.create({
    data: {
      ip: visitor?.query,
      city: visitor?.city,
      country: visitor?.country,
      region: visitor?.regionName,
      isp: visitor?.isp,
      urlId: url.id,
    },
  });

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: {
      clicks: url.clicks + 1,
    },
  });

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
