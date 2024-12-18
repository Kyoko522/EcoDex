# **EcoDex**

EcoDex is a Next.js web application that identifies plants and bugs using AI. Users can upload images via file input, URL, or a camera capture, and the app processes these images using a backend API.

---

## **Getting Started**

### **1. Prerequisites**
- Node.js => 16
- npm or yarn
- OpenAI API Key (required for AI image analysis)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-repo/ecodex.git
cd ecodex
```
### **3. Install Dependencies**
```bash
npm install
```
### **4. Configure Environment Variables**

Create a .env file in the root directory:
```bash
OPENAI_KEY=your_openai_api_key
```
### **5. Run the Development Server**
```bash
npm run dev
```
Open http://localhost:3000 to view the app.

Features

Landing Page
	•	Welcomes users and introduces EcoDex.
	•	Navigation buttons:
	•	Go to Vision Page: Directs users to the Vision page.
	•	Go to Database: Opens the Database page.

Vision Page
	•	Allows users to:
	•	Paste an Image URL.
	•	Use the Device Camera to capture an image.
	•	Provides structured analysis results using the API.

Database Page
	•	Placeholder for future database interactions.

Shared Functions
	•	setImageUrl(url) and getImageUrl(): Manage shared state between frontend components and backend.

Project Structure
```bash
ecodex/
├── public/                          # Static assets
│   └── images/                      # Static images (e.g., landing_image.jpg, grassBackground.png)
│
├── src/
│   ├── app/
│   │   ├── page.js                  # Landing Page
│   │   ├── view/
│   │   │   ├── vision/
│   │   │   │   ├── page.js          # Vision Page (camera & image analysis)
│   │   │   │   └── vision.css       # CSS for Vision Page
│   │   │   ├── database/
│   │   │       ├── page.js          # Database Page
│   │   │       └── database.css        # CSS for Database Page
│   │   │   └── login/ 
│   │   │       ├── page.js          # Login Page
│   │   │       └── login.css        # CSS for Login Page
│   │   │
│   │   ├── api/
│   │   │   ├── vision/
│   │   │   │   └── route.js         # API route for image analysis
│   │   │   ├── db/
│   │   │   │   └── route.js         # API route for database interaction
│   │   │   └── auth/
│   │   │       └── confirm/route.js # API route for email confirmation
│   │   │
│   │   ├── middleware.js            # Middleware to protect routes
│   │   └── layout.js                # Layout wrapper
│   │
│   ├── utils/
│   │   ├── supabase/
│   │   │   ├── server.js            # Supabase server-side client
│   │   │   └── middleware.js        # Supabase middleware for session handling
│   │   └── actions.js               # Actions for login and signup (server-side)
│   │
│   ├── shared.js                    # Shared variables & functions
│   └── styles/
│       └── globals.css              # Global styles for the project
│
├── .env                             # Environment variables (Supabase keys, etc.)
├── .gitignore                       # Ignored files in version control
├── README.md                        # Project documentation
├── package.json                     # Project metadata and scripts
└── package-lock.json                # Lockfile for dependencies
```
Key Files

Frontend
	•	Landing Page (src/app/page.js)
	•	Introduces EcoDex and navigates users to other pages.
	•	Displays a sample image with a description.
	•	Vision Page (src/app/view/vision/page.js)
	•	Allows image uploads, URL inputs, and camera captures.
	•	Uses conditional rendering for:
	•	Showing/hiding the camera feed.
	•	Displaying captured or uploaded images.
	•	Triggering API calls to analyze images.
	•	Database Page (src/app/view/database/page.js)
	•	Placeholder for future enhancements.
	•	Shared File (src/shared.js)
	•	Stores and retrieves the shared image URL variable.

API
	•	Image Analysis API (src/app/api/vision/route.js)
	•	Accepts image URLs or base64-encoded image data as input.
	•	Communicates with external APIs (e.g., OpenAI GPT-4o) for analysis.
	•	Database API (src/app/api/db/route.js)
	•	Placeholder for database operations.
 	•	Email confirmation API: src/app/api/auth/confirm/route.js
  	•	Verifies email confirmation tokens during sign-up (e.g. from Supabase).
   
Middleware
	•	Route protection middleware: src/app/middleware.js
 	•	Protects routes like /view/vision and view/database
  	•	Redirects unauthenticated users to /view/login/ while allowing access to /.

Utilities
	•	Supabase Server Client: src/utils/supabase/server.js
 	•	Handles server-side Supabase setup API routes and session management
  	•	Supabase Middleware: src/utils/superbase/middleware.js
   	•	Manages sessions and authenticates verification
   	•	Actions: src/utils/actions.js
   	•	Handles server-side actions for login and sign-up functionality 
   
How It Works
	1.	Run the App:
	•	Start the development server and open http://localhost:3000.
	2.	Image Analysis:
	•	Vision Page:
	•	Paste an image URL or capture an image using the camera.
	•	Click the Analyze button to send the image data for analysis.
	•	API:
	•	Sends the image data to the /api/vision endpoint for processing.
	•	Processes the response and displays the result on the Vision Page.
	3.	Database Page:
	•	Currently a placeholder for database functionality.

To Do
	•	Implement database functionality for storing and retrieving analyzed images.
	•	Add user authentication using NextAuth.js.
	•	Enhance the UI with error handling and loading animations.

Deployment

The app is designed to be easily deployed using platforms like Vercel:
	1.	Push your code to a GitHub repository.
	2.	Connect the repository to Vercel.
	3.	Deploy with one click.

License

This project is licensed under the MIT License.

Acknowledgments
	•	Next.js: For the React framework.
	•	OpenAI GPT-4o: For image analysis.
	•	Vercel: For easy deployment.

Copy and paste this content into your README.md file, and you’ll have a clean, organized, and professional project documentation.

