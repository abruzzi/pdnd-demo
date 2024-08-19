import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const EmptyCardHolder = ({ columnId }: { columnId: string }) => {
  const [aboutToDrop, setAboutToDrop] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    return dropTargetForElements({
      element,
      getData() {
        return {
          id: "placeholder",
          position: 0,
          columnId: columnId,
        };
      },
      onDragEnter() {
        setAboutToDrop(true);
      },
      onDragLeave() {
        setAboutToDrop(false);
      },
      onDrop() {
        setAboutToDrop(false);
      },
    });
  }, []);

  return (
    <ol className={`p-4 flex flex-col gap-4`} data-test-id={columnId}>
      <li
        ref={ref}
        className={`relative p-2 h-8 rounded-md ${
          aboutToDrop ? "bg-green-200" : ""
        }`}
      />
    </ol>
  );
};

export { EmptyCardHolder };
