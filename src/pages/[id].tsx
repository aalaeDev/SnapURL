import type { NextPage, GetServerSidePropsContext } from "next";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";

import { api } from "~/utils/api";

import { useEffectOnce } from "~/hooks/useEffectOnce";
import { type IPAddressInfo } from "~/types";
import { useRouter } from "next/router";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const urlCode = context.params?.id;

  const visitorIP =
    context.req.headers["x-forwarded-for"] ??
    context.req.connection.remoteAddress;

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

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: {
      clicks: url.clicks + 1,
    },
  });

  // return {
  //   redirect: {
  //     destination: url.originalUrl,
  //     permanent: false,
  //   },
  // };

  return {
    props: {
      trpcState: ssr.dehydrate(),
      urlId: url.id,
      originalUrl: url.originalUrl,
      visitorIP,
    },
  };
}

const Redirect: NextPage<{
  urlId: string;
  originalUrl: string;
  visitorIP: string | string[] | undefined;
}> = ({ urlId, originalUrl, visitorIP }) => {
  const router = useRouter();
  const { mutate: createVisitor } = api.url.createVisitor.useMutation({
    // onSuccess: () => {
    //   void router.replace(originalUrl);
    // },
    // onError: () => {
    //   void router.replace(originalUrl);
    // },
  });

  async function getVisitorIp() {
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

    return visitor;
  }

  useEffectOnce(() => {
    const generateAnalytics = async () => {
      const visitor = await getVisitorIp();

      createVisitor({
        urlId,
        ip: visitor?.query,
        country: visitor?.country,
        city: visitor?.city,
        region: visitor?.regionName,
        isp: visitor?.isp,
      });
    };

    void generateAnalytics();
  });

  return <>{visitorIP}</>;
};

export default Redirect;
