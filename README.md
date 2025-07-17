# 🚧 Raise Your Issue — Voice for the Streets

Video Link : https://youtu.be/5iC0Voj3zD0

A platform where people can raise street-level issues in their area — like potholes, broken lights, garbage dumps, or any public problem — and track if and when they get resolved.

## 💡 Why I built this

We all complain about how bad roads are or how there's always garbage lying around — but no one really knows where to report it or if anyone even listens.

So I built a simple platform where **you can raise your issue publicly**, and maybe — just maybe — someone responsible will take action. At the very least, it brings awareness and pressure.

## 🔧 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Image Upload**: (Optional) Cloudinary or base64
- **Authentication**: JWT (Login/Signup)
- **State Management**: Context API

## 🌐 Features

- 🙋‍♂️ Raise an issue with a title, description, and image (optional)
- 📍 Add your location (manually or via map if integrated)
- 🗨️ Comment section for discussions and updates
- ✅ Mark issues as resolved when fixed
- 🔐 JWT-based user login/signup

## 🚀 Getting Started Locally

```bash
# Clone the repo
git clone https://github.com/your-username/raise-your-issue.git

# Install dependencies in both frontend and backend
cd raise-your-issue

# Start the frontend
cd client
npm install
npm run dev

# Start the backend
cd ../server
npm install
npm run server
