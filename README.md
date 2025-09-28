\# Manohar\_WebDev\_Assignment

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML``   ## Project Overview  This is a **dynamic blog platform** built using **Next.js** and **MongoDB**. It features:    - Homepage with paginated posts and search functionality    - Individual post pages (`/blog/[slug]`)    - Admin interface for **creating, updating, deleting posts** using a rich text editor (`react-quill`)    - REST API endpoints for posts    - Image support via URLs    The project demonstrates **full-stack development skills** using modern JavaScript frameworks and a NoSQL database.  ---  ## Features  - Dynamic paginated homepage    - Single post pages with SSR (server-side rendering)    - Admin panel for CRUD operations    - Tag-based filtering and search    - MongoDB integration via Mongoose    - Rich-text editor for post content    - Image support via URLs    ---  ## Setup Instructions  ### 1. Clone the repository  ```bash  git clone   cd nextjs-blog   ``

### 2\. Install dependencies

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

### 3\. Configure environment variables

Create a .env.local file in the project root:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   MONGODB_URI=mongodb+srv://:@cluster0.mongodb.net/nextjs_blog?retryWrites=true&w=majority  NEXT_PUBLIC_BASE_URL=http://localhost:3000   `

*   MONGODB\_URI → MongoDB Atlas URI or local MongoDB connection string
    
*   NEXT\_PUBLIC\_BASE\_URL → Base URL for your app (localhost for local dev)
    

### 4\. Run the application

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

Visit http://localhost:3000 to see the homepage.Visit http://localhost:3000/admin for the admin panel.

Quick Start Commands
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # Start development server  npm run dev  # Build for production  npm run build  # Start production server  npm start  # Lint the project  npm run lint   `

Dependencies
------------

PackageVersionnext13.5.6react18.2.0react-dom18.2.0axios^1.6.0mongoose^7.6.0react-quill2.0.0slugify1.6.6date-fns^2.31.0

> All dependencies are listed in package.json.

Database Setup
--------------

1.  **MongoDB Atlas**: Create a free cluster at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
    
2.  Create a database named nextjs\_blog
    
3.  Update .env.local with your connection string
    
4.  The application uses a Post collection for storing blog posts. The schema is defined in models/Post.js
    

Project Structure
-----------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   nextjs-blog/  ├─ package.json  ├─ next.config.js  ├─ .env.local  ├─ README.md  ├─ lib/  │  └─ dbConnect.js  ├─ models/  │  └─ Post.js  ├─ pages/  │  ├─ _app.js  │  ├─ index.js  │  ├─ blog/[slug].js  │  ├─ admin/index.js  │  └─ api/blogs/  │     ├─ index.js  │     └─ [slug].js  ├─ components/  │  ├─ Layout.js  │  ├─ PostCard.js  │  └─ Editor.js  └─ public/     └─ (optional sample images)   `

Notes
-----

*   Admin panel currently has **no authentication** (for demo purposes)
    
*   Images are added via URLs in the admin panel
    
*   For production, add authentication, input validation, and image hosting solutions (e.g., Cloudinary)
    
*   The app uses **server-side rendering** for SEO and performance