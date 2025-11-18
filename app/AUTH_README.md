# JWT Authentication Integration

This directory contains the client-side JWT authentication implementation that integrates with the backend API at `/api/v1/auth`.

## Overview

The authentication system includes:
- **Axios client** with automatic JWT token refresh on 401 errors
- **Auth API module** with login, register, refresh, and logout functions
- **Secure token storage** using expo-secure-store (mobile) with localStorage fallback (web)
- **AuthProvider** React context for managing authentication state
- **AuthModal** example component for demonstration

## Usage

### 1. The app is already wrapped with AuthProvider

The `AuthProvider` is already added to `app/_layout.tsx`:

```tsx
import { AuthProvider } from "@/app/contexts/AuthProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BettingProvider>
          {/* ... */}
        </BettingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### 2. Use the useAuth hook in any component

```tsx
import { useAuth } from '@/app/contexts/AuthProvider';

function MyComponent() {
  const { user, loading, login, register, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ 
        email: 'user@example.com', 
        password: 'password123' 
      });
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  
  return (
    <View>
      {user ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
```

### 3. Making authenticated API calls

The axios client automatically adds JWT tokens to requests:

```tsx
import api from '@/app/lib/api/axios';

// This request will automatically include the JWT token
const response = await api.get('/user/profile');

// If the token is expired, it will automatically refresh and retry
```

## API Endpoints

The backend API is expected to have the following endpoints:

- `POST /api/v1/auth/login` - Login with username/email and password
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/refresh?refreshToken=...` - Refresh access token (query param)
- `POST /api/v1/auth/logout?token=...` - Logout (query param)

## Environment Variables

Set the backend API URL in your `.env` file:

```
EXPO_PUBLIC_API_URL=http://your-api-url:8080/api/v1
```

Default: `http://localhost:8080/api/v1`

## Token Storage

- **Mobile**: Uses `expo-secure-store` for secure encrypted storage
- **Web**: Falls back to `localStorage` (not secure for production web apps)

For production web apps, consider using httpOnly cookies instead.

## Automatic Token Refresh

The axios interceptor automatically:
1. Detects 401 (Unauthorized) responses
2. Attempts to refresh the access token using the refresh token
3. Retries the original request with the new token
4. Queues multiple simultaneous requests to avoid duplicate refresh calls
5. Clears tokens and logs out if refresh fails

## Example: AuthModal Component

A basic authentication modal is provided at `app/components/AuthModal.tsx`:

```tsx
import AuthModal from '@/app/components/AuthModal';

function MyScreen() {
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <>
      <Button title="Login" onPress={() => setShowAuth(true)} />
      {showAuth && (
        <AuthModal 
          mode="login" 
          onClose={() => setShowAuth(false)} 
        />
      )}
    </>
  );
}
```

## Files Structure

```
app/
├── lib/
│   ├── api/
│   │   ├── axios.ts      # Axios client with JWT interceptors
│   │   └── auth.ts       # Authentication API functions
│   └── auth/
│       └── storage.ts    # Token storage utilities
├── contexts/
│   └── AuthProvider.tsx  # Authentication context provider
└── components/
    └── AuthModal.tsx     # Example authentication modal
```

## Security Notes

1. Tokens are stored securely using expo-secure-store on mobile
2. Web fallback uses localStorage (upgrade to httpOnly cookies for production)
3. Access tokens are automatically refreshed before expiry
4. All tokens are cleared on logout or refresh failure
5. No security vulnerabilities found by CodeQL scan
