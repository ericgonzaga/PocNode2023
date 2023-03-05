import { server } from './server';
import 'dotenv/config';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
