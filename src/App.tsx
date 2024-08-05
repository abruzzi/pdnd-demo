import './App.css'

function App() {
  return (
    <div className="flex flex-col m-auto bg-gray-100 h-screen overflow-auto">
      <h1 className="mx-10 my-4 text-2xl">My Board</h1>
      <ol className="max-h-full mx-10 my-4 flex flex-row gap-6 flex-grow">
        <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
          <h2 className="p-4 text-slate-700">To do</h2>
          <ol className="p-4 flex flex-col gap-4">
            <li className="p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab">
              <p>Buy some milk</p>
            </li>

            <li className="p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab">
              <p>Write some CSS</p>
            </li>
          </ol>
        </li>
        <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
          <h2 className="p-4 text-slate-700">In progress</h2>
        </li>
        <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
          <h2 className="p-4 text-slate-700">Done</h2>
        </li>
      </ol>
    </div>
  )
}

export default App
