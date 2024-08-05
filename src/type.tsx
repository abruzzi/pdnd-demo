export type CardType = {
  id: string;
  title: string;
  position: number;
  columnId: string;
};

export type ColumnType = {
  id: string;
  name: string;
  cards: CardType[];
};

export type Board = {
  name: string;
  columns: ColumnType[];
};
