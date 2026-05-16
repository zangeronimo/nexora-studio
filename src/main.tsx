import reactDom from 'react-dom/client';
import { App } from './presentation/App';

const container = document.getElementById('root');
const root = reactDom.createRoot(container!);

root.render(<App />);
