export default function Search({search, setSearch, handleSubmit}) {
    return (
        <div className='search-engine'>
            <input
                type='text'
                placeholder='Enter City Name'
                name='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSubmit}>Search Weather</button>
        </div>
    )
}
