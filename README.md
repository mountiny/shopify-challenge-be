# shopify-challenge-be
The Code Challenge for Shopify Backend Developer Intern position

### Stack

I have decided to use Strapi headless CMS for the backend part. This is an open-source CMS built upon Node.js. It can save me a lot of work with setting up the routes. I will upload and store the images in Cloudinary. The backend is deployed to Heroku on https://shopify-challenge-be.herokuapp.com/admin.

__Note__: I am using heroku free tier for this project, which means that the deployed backend will go to sleep after 30 minutes of inactivity. Therefore, it might take some time the first time you run the app to start working.

For the frontend part, I chose to use Next.js in combination with TailwindCSS. I love this combination and it makes my development process feel so fast. I will deploy this to Vercel. 

To make the fetchin easier, I have used useSWR, which I find very handy when you need to revalidate data from backend which can change often.

I have used Next.js + TailwindCSS started from Taylor Bryant to speed up the setting up process. The website is deployed on this link [https://shopify-challenge-be.vercel.app/].

### Funcionalities

I have kept the backend features list quite small. User can upload image or image set with name and description. There is a limit for the image sizes (10MB). After uploading the images, users can see all of them in library, where they can also delete it. Anyone can do it as I have not implemented user login. Although, if I would be asked to do it, Strapi makes this quite straightforward to accomplish.

### How to run

To run the backend


```
cd be
npm install
npm run develop
```

__IMPORTANT__ For the upload functionality to work properly, you have to create your own Cloudinary account and add appropriate env variables to be/.env. You can find the names of the variables in .env.template.


To run the frontend


```
cd fe
npm install
npm run dev
```

