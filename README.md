<!----- BEGIN GHOST DOCS HEADER ----->
<!----- END GHOST DOCS HEADER ----->

## Installation

```sh
npm i d1-driver
```

## Usage

```js
import { D1 } from 'd1-driver'

// Create a new instance of D1
const d1 = new D1('YOUR_CLOUDFLARE_ACCOUNT_ID', 'YOUR_CLOUDFLARE_API_KEY')

// List all databases
const db_list = await d1.list()

const db_uuid = db_list[0].uuid

// Get a database by UUID
await d1.get(db_uuid)

// Create a new database
await d1.create('new_database_name')

// Delete a database by UUID
await d1.delete(db_uuid)

// Query a database
await d1.query(db_uuid, 'SELECT * FROM table_name')
```

<!----- BEGIN GHOST DOCS FOOTER ----->
<!----- END GHOST DOCS FOOTER ----->
