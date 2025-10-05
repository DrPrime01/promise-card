interface CustomTableProps {
  tableHead: TableHeadProps[];
  tableBody: TableBodyProps[];
}

const CustomTable = ({ tableBody, tableHead }: CustomTableProps) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left">
          <tr className="text-xs font-medium tracking-[-0.5%] text-[#344054]">
            {tableHead.map((row) => (
              <th key={row.id} className="px-6 py-3 h-12 uppercase">
                {row.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {tableBody?.map((t) => (
            <tr
              key={t.id}
              className="hover:bg-gray-50 text-sm leading-[145%] text-[#344054]"
            >
              {tableHead.map((head) => (
                <td key={head.id} className="px-6 py-4">
                  {t[head.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
