import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { RequireAuth } from './components/RequireAuth'

const FeedPage = lazy(() => import('./pages/FeedPage').then((m) => ({ default: m.FeedPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('./pages/SignupPage').then((m) => ({ default: m.SignupPage })))
const PostDetailPage = lazy(() => import('./pages/PostDetailPage').then((m) => ({ default: m.PostDetailPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout').then((m) => ({ default: m.DashboardLayout })))
const PostsDashboard = lazy(() => import('./pages/dashboard/PostsDashboard').then((m) => ({ default: m.PostsDashboard })))
const CreatePost = lazy(() => import('./pages/dashboard/CreatePost').then((m) => ({ default: m.CreatePost })))
const EditPost = lazy(() => import('./pages/dashboard/EditPost').then((m) => ({ default: m.EditPost })))
const ProfileSettings = lazy(() => import('./pages/dashboard/ProfileSettings').then((m) => ({ default: m.ProfileSettings })))

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route path="posts" element={<PostsDashboard />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="edit/:postId" element={<EditPost />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}