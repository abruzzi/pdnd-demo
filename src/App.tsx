import './App.css'

type CardType = {
  id: string;
  title: string
}

const Card = ({id, title}: CardType) => {
  return (<li data-test-id={id} className="p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab">
    <p>{title}</p>
  </li>)
}

const CardList = ({cards}: { cards: CardType[] }) => {
  return (<ol className="p-4 flex flex-col gap-4">
    {cards.map(card => <Card key={card.id} id={card.id} title={card.title}/>)}
  </ol>)
}

const Column = ({name, cards = []}: { name: string, cards?: CardType[] }) => {
  return <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
    <h2 className="p-4 text-slate-700">{name}</h2>
    {
      cards.length > 0 ? <CardList cards={cards}/> : null
    }
  </li>;
}

const cards = [
  {id: 'id-1', title: 'Buy some milk'},
  {id: 'id-1', title: 'Write some CSS'}
]

function App() {
  return (
    <div className="flex flex-col m-auto bg-gray-100 h-screen overflow-auto">
      <h1 className="mx-10 my-4 text-2xl">My Board</h1>
      <ol className="max-h-full mx-10 my-4 flex flex-row gap-6 flex-grow">
        <Column name="Todo" cards={cards}/>
        <Column name="In progress"/>
        <Column name="Done"/>
      </ol>
    </div>
  )
}

export default App
