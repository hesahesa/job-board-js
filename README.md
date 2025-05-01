# job-board-js

A Mini Job Board App using Next.js and Supabase

# Live Vercel URL
You can try out this project by visiting: https://job-board-js.vercel.app/

![Tux, the Linux mascot](https://i.ibb.co.com/b5zh8zG2/image.png)

# Development Instruction
- create an `env.local` file with these following values, replace with the value from Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=<PUBLIC_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
```
- create a table `job` in the Supabase project with these following columns:
		- id: int8, primary key
		- created_at: timestamptz
		- title: varchar
		- company_name: varchar
		- description: varchar
		- location: varchar
		- job_type: varchar
		- created_by: varchar
- Run the project: `npm run dev`

# Architecture Overview
- The project is initialized using `npx create-next-app --example with-supabase .` to speedup the development project
- The `utils/model/job.ts` contains an `interface` to make operating on Job instance easier
-  The `utils/supabase/queries.ts` contains functions that makes querying to the underlying Supabase database easier
- The `components/portal/*` contains React components to list posted Jobs
- The `filter/[location]/[type]` contains route to handle public Job filtering. It filters by location and the job type. Currently it does exact match on the `location`
- The `dashboard/add-job` handles adding a new job
- The `dashboard/delete-job/[id]` handles deleting a job. Only Job creator can delete the job
- The `dashboard/edit-job/[id]` handles editing a job. Only Job creator can delete the job

# Future Improvement
Given more time, the UI of the page can be improved (currently it is reusing a lot of design and component from the boilerplate of `with-supabase` next-app.
Also, the filtering mechanism can be improved to not only consider exact match of the location. The whole filtering can also be improved further by processing the filtering in the same page as the homepage.