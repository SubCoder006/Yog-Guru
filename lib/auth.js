// lib/auth.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import clientPromise, { getUserByEmail, createUser } from './db';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);
        
        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          subscription: user.subscription
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.subscription = user.subscription;
      }
      
      // Update session data when explicitly triggered
      if (trigger === 'update' && session) {
        token.subscription = session.subscription;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.subscription = token.subscription;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        // Check if user exists in database
        const existingUser = await getUserByEmail(user.email);
        
        if (!existingUser) {
          // Create new user with Google data
          await createUser({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: 'google',
            googleId: profile.sub
          });
        }
      }
      return true;
    }
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
