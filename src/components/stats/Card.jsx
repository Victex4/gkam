const Card = ({ data }) => {
  return (
    <div className="bg-white px-3 py-2 pb-0 rounded-2xl flex gap-3">
      <div>
        <div className="flex flex-row items-center gap-2">
          <span className={`${data.bgColor} p-2 text-xl rounded-2xl dark:bg-gray-500`}>
            <data.icon/>
          </span>
          <p className="font-bold">{data.title}</p>
        </div>
        <div className="text-end">
          <h2 className="text-sm"><span className="text-xl">{data.count}</span></h2>
        </div>
      </div>
    </div>
  )
}

export default Card
