# Test School Backend

## Folder Structure

```
eslint.config.mjs
package.json
question.json
README.md
tsconfig.json
vercel.json
src/
	app.ts
	server.ts
	app/
		builder/
			queryBuilder.ts
		config/
			index.ts
		errors/
			AppError.ts
			handleCastError.ts
			handleDuplicateError.ts
			handleValidationError.ts
			handleZodError.ts
		interface/
			error.ts
			index.d.ts
		middlewares/
			auth.ts
			globalErrorHandler.ts
			notFoundRoute.ts
			validateRequest.ts
		modules/
			auth/
				auth.controller.ts
				auth.interface.ts
				auth.route.ts
				auth.services.ts
				auth.utils.ts
				auth.validation.ts
			otp/
				otp.controller.ts
				otp.interface.ts
				otp.model.ts
				otp.route.ts
				otp.services.ts
			question/
				question.controller.ts
				question.interface.ts
				question.model.ts
				question.route.ts
				question.services.ts
				question.validation.ts
			result/
				result.controller.ts
				result.interface.ts
				result.model.ts
				result.route.ts
				result.services.ts
				result.validation.ts
			User/
				user.constant.ts
				user.controller.ts
				user.interface.ts
				user.model.ts
				user.route.ts
				user.service.ts
				user.validation.ts
		routes/
			index.ts
		utils/
			catchAsync.ts
			sendResponse.ts
```

## Prerequisites

- Node.js (v18 or above recommended)
- Yarn or npm
- MongoDB (local or cloud)

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd test-school-backend
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   # or
   npm install
   ```

3. **Create a `.env` file in the project root copy env.example and modify with your value :**

4. **Run the server locally:**

   ```sh
   yarn start
   # or
   npm start
   ```

---

For any issues, please open an issue or contact the maintainer.
