import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { MongoClient } from "mongodb"
import { createUser, getUserByEmail } from '@/lib/db'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Add your user authentication logic here
          // This is a basic example - you should hash passwords in production
          const client = await clientPromise
          const users = client.db().collection("users")
          
          const user = await users.findOne({ 
            email: credentials.email 
          })

          if (user && user.password === credentials.password) {
            return {
              id: user._id,
              email: user.email,
              name: user.name,
            }
          }
          
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id || user._id || token.id
        token.name = user.name || token.name
        token.email = user.email || token.email
        token.picture = user.image || profile?.picture || token.picture
      }
      return token
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id
        session.user.image = token.picture || session.user.image
        session.user.name = token.name || session.user.name
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && user?.email) {
        try {
          const existing = await getUserByEmail(user.email)
          if (!existing) {
            await createUser({
              email: user.email,
              name: user.name,
              image: user.image || profile?.picture,
              provider: 'google'
            })
          }
        } catch (e) {
          console.error('Google sign-in DB sync failed:', e)
        }
      }
      return true
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
