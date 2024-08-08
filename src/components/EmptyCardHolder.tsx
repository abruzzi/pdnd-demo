import React from "react";

const EmptyCardHolder = ({ columnId }: { columnId: string }) => {
  return (
    <ol className="p-4 flex flex-col gap-4" data-test-id={columnId}>
      <li className={`relative p-2 hover:cursor-grab h-4`} />
    </ol>
  );
};

export { EmptyCardHolder };
