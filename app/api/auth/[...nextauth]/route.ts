import {handlers} from "@/auth";
/*
Handles all authentication requests - It processes all the OAuth flows, sign-in/sign-out requests, and authentication callbacks

/api/auth/signin - Sign in page
/api/auth/signout - Sign out
/api/auth/callback/google - Google OAuth callback
/api/auth/callback/github - GitHub OAuth callback
/api/auth/session - Current session info
And many more NextAuth endpoints
*/
export const {GET, POST} = handlers; 

