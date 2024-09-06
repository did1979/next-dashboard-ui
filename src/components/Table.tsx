const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns.map((column) => (
            <th className={column.className} key={column.accessor}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((col) => renderRow(col))}</tbody>
    </table>
  );
};

export default Table;
