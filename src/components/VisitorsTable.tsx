import React from "react";
import { Table } from "@radix-ui/themes";
import moment from "moment";
import { api } from "~/utils/api";
import Loader from "./Icons/Loader";

// interface Visitor {
//   id: string;
//   ip: string | null;
//   visitedAt: Date;
//   country: string | null;
//   region: string | null;
//   city: string | null;
//   isp: string | null;
//   urlId: string | null;
// }

interface VisitorsTableProps {
  // visitors: Visitor[];
  urlId: string;
}

const LIMIT = 15;

export default function VisitorsTable({ urlId }: VisitorsTableProps) {
  const [page, setPage] = React.useState(0);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = api.visitor.getAll.useInfiniteQuery(
    { urlId, limit: LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const visitors = data?.pages[page]?.visitors;
  const end = data?.pages.length ?? 0;

  const hasPrev = page > 0;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasNext = hasNextPage || page < end - 1;

  const handleFetchNextPage = () => {
    if (!hasNext) return;
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    if (!hasPrev) return;
    setPage((prev) => prev - 1);
  };

  if (isLoading)
    return (
      <div className=" flex grow items-center justify-center">
        <Loader className="text-neutral-200" />
      </div>
    );

  return (
    <div className="flex h-full flex-col gap-6 pb-10">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={"15%"}>
              IP Address
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"20%"}>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"30%"}>
              Region/Country
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"15%"}>ISP</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"20%"}>
              Timestamp
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {!(isFetchingNextPage || isFetchingPreviousPage) &&
        visitors &&
        visitors.length > 0 ? (
          <Table.Body>
            {visitors.map((visitor) => (
              <Table.Row
                key={visitor.id}
                className="duration-200 hover:bg-neutral-600 hover:bg-opacity-30"
              >
                <Table.RowHeaderCell>
                  {visitor.ip ?? "0.0.0.0"}
                </Table.RowHeaderCell>
                <Table.Cell className="text-neutral-200">
                  {moment(visitor.visitedAt).fromNow()}
                </Table.Cell>
                <Table.Cell className="text-neutral-200">{`${
                  visitor.region && visitor.country ? visitor.region + ", " : ""
                } ${visitor.country ?? "-"} ${
                  visitor.city ? "(" + visitor.city + ")" : ""
                }`}</Table.Cell>
                <Table.Cell className="text-neutral-200">
                  {visitor.isp ?? "-"}
                </Table.Cell>
                <Table.Cell className="text-neutral-200">
                  {moment(visitor.visitedAt).format("YYYY-MM-DD hh:mm:ss A")}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : null}
      </Table.Root>

      {isFetchingNextPage || isFetchingPreviousPage ? (
        <div className=" flex grow items-center justify-center">
          <Loader className="text-neutral-200" />
        </div>
      ) : null}

      <div className="flex justify-end gap-4">
        <button
          className={`${
            hasPrev
              ? "text-neutral-100"
              : "pointer-events-none text-neutral-600"
          } hover:underline`}
          onClick={handleFetchPreviousPage}
        >
          Previous
        </button>
        <button
          className={`${
            hasNext
              ? "text-neutral-100"
              : "pointer-events-none text-neutral-600"
          } hover:underline`}
          onClick={handleFetchNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
