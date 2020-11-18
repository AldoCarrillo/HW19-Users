import { useRef } from 'react';

import RenderUsers from './components/RenderUsers';

function App() {
	const inputRef = useRef();

	return (
		<div>
			<RenderUsers />
		</div>
	);
}

export default App;
