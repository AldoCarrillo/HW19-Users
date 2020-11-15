import { useRef } from 'react';

import RenderUsers from './components/RenderUsers';

function App() {
	const inputRef = useRef();

	function handleAddFilter(e) {
		const info = inputRef.current.value;

		inputRef.current.value = null;
	}

	return (
		<div>
			<div id="search">
				<h1>Filter</h1>
				<br />
				<input type="checkbox" id="check1" value="AZ" />
				<label id="c1"> A-Z</label>
				<input type="checkbox" id="check2" value="ZA" />
				<label id="c2"> Z-A</label>
				<br />
				<input id="inputText" type="text" ref={inputRef} />
				<button id="searchBtn" className="btn btn-secondary btn-sm" onClick={handleAddFilter}>
					Search
				</button>
			</div>

			<RenderUsers />
		</div>
	);
}

export default App;
