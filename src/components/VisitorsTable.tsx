import { Table } from "@radix-ui/themes";
import moment from "moment";

interface Visitor {
  id: string;
  ip: string | null;
  visitedAt: Date;
  country: string | null;
  region: string | null;
  city: string | null;
  isp: string | null;
  urlId: string | null;
}

interface VisitorsTableProps {
  visitors: Visitor[];
}

export default function VisitorsTable({ visitors }: VisitorsTableProps) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>IP Address</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Region/Country</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>ISP</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Timestamp</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      {visitors.length > 0 ? (
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
  );
}
