In Next.js 15, an uncommon bug can occur when using the `async/await` syntax within a `getServerSideProps` function that fetches data from an external API.  If the API request fails, the error might not be properly handled, leading to a 500 Internal Server Error without any clear indication of the problem in the logs.  This is because the error might be swallowed by the async operation, and Next.js's error handling mechanisms might not catch it effectively.